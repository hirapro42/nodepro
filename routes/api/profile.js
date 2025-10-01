const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/profile');
const User = require('../../models/users');
const mongoose = require('mongoose');
const { check, validationResult } = require('express-validator');

//@Route GET api/profile
//@desc  Test route
//@access   public

router.get('/me', auth, async (req, res) => {
    try {

        const profile = await Profile.findOne({ user: req.user.id }).populate('user',
            ['name', 'avatar']);
        if (!profile)
        {
            return res.status(400).json({
                mag:
                    'there is no profile for this user'
            });
        }
        res.json(profile);
        
    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});
//@Route Post api/profile
//@desc  create profile
//@access   private
router.post('/',
    [
        auth,
        [
            check('status', 'Status is required')
                .not()
                .isEmpty(),
            check('skill', 'skill is required')
                .not()
                .isEmpty(),
        ]
    ], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const {
            campany,
            website,
            location,
            bio,
            status,
            githubusername,
            skill,
            youtube,
            facebook,
            twitter,
            instagram,
            linkedin,
        } = req.body;
        // build profile object
        const profileFields = {};
        profileFields.user = req.user.id;
        if (campany) profileFields.campany = campany;
        if (website) profileFields.website = website;
        if (location) profileFields.location = location;
        if (bio) profileFields.bio = bio;
        if (status) profileFields.status = status;
        if (githubusername) profileFields.githubusername = githubusername;
        if (skill) {
            profileFields.skill = skill.split(',').map(skill => skill.trim());
           
        }
        profileFields.social = {};
        if (youtube) profileFields.social.youtube = youtube;
        if (twitter) profileFields.social.twitter = twitter;
        if (facebook) profileFields.social.facebook = facebook;
        if (linkedin) profileFields.social.linkedin = linkedin;
        if (instagram) profileFields.social.instagram = instagram;
        try {
            let profile = await Profile.findOne({ user: req.user.id })
            if (profile) {
                //Update
                profile = await Profile.findOneAndUpdate(
                    { user: req.user.id },
                    {$set: profileFields},
                    {new: true}  
                );
                return res.json(profile);

            }
            // Create
            profile = new Profile(profileFields);
            await profile.save();
        } catch (err) {
            console.error(err.message)
            res.status(500).send('Server Error');
        }
        

    
})

//@route Get Api/profile
// @desc get All Profile
// @Access Public
router.get('/', async (req, res) => {
    try {
        const profile = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});
//@route Get Api/profile/user/:user_id
// @desc get User by ID
// @Access Public
router.get('/user/:user_id', async (req, res) => {
  try {
    // ✅ Validate first
    if (!mongoose.Types.ObjectId.isValid(req.params.user_id)) {
      return res.status(400).json({ msg: 'No user Id for this User' });
    }

    // ✅ Query only if valid
    const profile = await Profile.findOne({ user: req.params.user_id })
      .populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(404).json({ msg: 'Profile not found' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
//@route Delete Api/profile
// @desc Delete Profile. user and post
// @Access private

router.delete('/', auth, async (req, res) => {
  try {
    // remove user posts if you have a Post model
    // await Post.deleteMany({ user: req.user.id });

    // remove profile
    await Profile.findOneAndDelete({ user: req.user.id });

    // remove user
    await User.findByIdAndDelete(req.user.id);

    return res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});






module.exports = router;