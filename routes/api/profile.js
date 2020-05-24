const express = require("express");
const passport = require("passport");

const Profile = require("../../models/profile");
const User = require("../../models/user");
const validateProfileInput = require("../../validation/profile");
const validateExperienceInput = require("../../validation/experience");
const validateEducationInput = require("../../validation/education");

/* -------------------------------------------------------------------------- */

const router = express.Router();

// @route   GET api/profile
// @desc    Get current user profile
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { id } = req.user;
    const errors = {};

    const profile = await Profile.findOne({ user: id })
      .populate("user", ["name", "avatar"])
      .catch(() => {
        return res.status(404).json({ msg: "Error in find user profile" });
      });

    if (!profile) {
      errors.noProfile = "There is no profile for this user";

      return res.status(404).json(errors);
    }

    res.json(profile);
  }
);

// @route   GET api/profile/all
// @desc    Get all profile
// @access  Public
router.get("/all", async (req, res) => {
  const errors = {};

  const profiles = await Profile.find()
    .populate("user", ["name", "avatar"])
    .catch(() => {
      return res.status(404).json({ msg: "Error in find all profile" });
    });

  if (!profiles || profiles.length === 0) {
    errors.noProfile = "There are no profile";

    return res.status(404).json(errors);
  }

  res.json(profiles);
});

// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public
router.get("/handle/:handle", async (req, res) => {
  const errors = {};

  const profile = await Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .catch(() => {
      return res
        .status(404)
        .json({ msg: "Error in find user profile by handle" });
    });

  if (!profile) {
    errors.noProfile = "There is no profile for this user";

    return res.status(404).json(errors);
  }

  res.json(profile);
});

// @route   GET api/profile/user/:userId
// @desc    Get profile by user id
// @access  Public
router.get("/user/:userId", async (req, res) => {
  const errors = {};

  const profile = await Profile.findOne({ user: req.params.userId })
    .populate("user", ["name", "avatar"])
    .catch(() => {
      return res.status(404).json({ msg: "Error in find user profile by id" });
    });

  if (!profile) {
    errors.noProfile = "There is no profile for this user";

    return res.status(404).json(errors);
  }

  res.json(profile);
});

// @route   POST api/profile
// @desc    Create or edit user profile
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { isValid, errors } = validateProfileInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const { id } = req.user;
    const social = ["facebook", "twitter", "instagram", "linkedin", "youtube"];
    const profileFields = { ...req.body, user: id, social: {} };

    if (typeof req.body.skills !== "undefined") {
      profileFields.skills = req.body.skills
        .split(",")
        .map((skill) => skill.trim());
    }

    social.forEach((val) => {
      if (req.body[val]) {
        delete profileFields[val];

        profileFields.social[val] = req.body[val];
      }
    });

    const existingProfile = await Profile.findOne({ user: id }).catch(() => {
      return res.status(404).json({ msg: "Error in check profile" });
    });

    // Update Profile
    if (existingProfile) {
      const profile = await Profile.findOneAndUpdate(
        { user: id },
        { $set: profileFields },
        { new: true }
      );

      return res.json(profile);
    }

    // Create Profile

    // Check if handle exists
    const profile = await Profile.findOne({ handle: profileFields.handle });

    if (profile) {
      errors.handle = "That handle already exists";

      return res.status(400).json(errors);
    }

    // Save Profile
    const newProfile = await new Profile(profileFields).save().catch(() => {
      return res.status(404).json({ msg: "Error in save new profile" });
    });

    res.json(newProfile);
  }
);

// @route   POST api/profile/experience
// @desc    Add experience to profile
// @access  Private
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { isValid, errors } = validateExperienceInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const { id } = req.user;
    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    } = req.body;

    const existingProfile = await Profile.findOne({ user: id }).catch(() => {
      return res.status(404).json({ msg: "Error in find user profile" });
    });

    if (!existingProfile) {
      errors.noProfile = "There is no profile for this user";

      return res.status(404).json(errors);
    }

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };

    existingProfile.experience.unshift(newExp);

    const profile = await existingProfile.save();

    res.json(profile);
  }
);

// @route   POST api/profile/education
// @desc    Add education to profile
// @access  Private
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { isValid, errors } = validateEducationInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const { id } = req.user;
    const {
      school,
      degree,
      fieldOfStudy,
      from,
      to,
      current,
      description,
    } = req.body;

    const existingProfile = await Profile.findOne({ user: id }).catch(() => {
      return res.status(404).json({ msg: "Error in find user profile" });
    });

    if (!existingProfile) {
      errors.noProfile = "There is no profile for this user";

      return res.status(404).json(errors);
    }

    const newEdu = {
      school,
      degree,
      fieldOfStudy,
      from,
      to,
      current,
      description,
    };

    existingProfile.education.unshift(newEdu);

    const profile = await existingProfile.save();

    res.json(profile);
  }
);

// @route   DELETE api/profile/experience/:expId
// @desc    Delete experience from profile
// @access  Private
router.delete(
  "/experience/:expId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { id } = req.user;

    const existingProfile = await Profile.findOne({ user: id }).catch(() => {
      return res.status(404).json({ msg: "Error in find user profile" });
    });

    if (!existingProfile) {
      errors.noProfile = "There is no profile for this user";

      return res.status(404).json(errors);
    }

    // Get remove index
    const removeIndex = existingProfile.experience
      .map((item) => item.id)
      .indexOf(req.params.expId);

    // Splice out of array
    existingProfile.experience.splice(removeIndex, 1);

    // Save
    const profile = await existingProfile.save().catch(() => {
      return res
        .status(404)
        .json({ msg: "Error in save profile after delete experience" });
    });

    res.json(profile);
  }
);

// @route   DELETE api/profile/education/:eduId
// @desc    Delete education from profile
// @access  Private
router.delete(
  "/education/:eduId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { id } = req.user;

    const existingProfile = await Profile.findOne({ user: id }).catch(() => {
      return res.status(404).json({ msg: "Error in find user profile" });
    });

    if (!existingProfile) {
      errors.noProfile = "There is no profile for this user";

      return res.status(404).json(errors);
    }

    // Get remove index
    const removeIndex = existingProfile.education
      .map((item) => item.id)
      .indexOf(req.params.eduId);

    // Splice out of array
    existingProfile.education.splice(removeIndex, 1);

    // Save
    const profile = await existingProfile.save().catch(() => {
      return res
        .status(404)
        .json({ msg: "Error in save profile after delete education" });
    });

    res.json(profile);
  }
);

// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { id } = req.user;

    await Profile.findOneAndRemove({ user: id }).catch(() => {
      return res.status(404).json({ msg: "Error in find user profile" });
    });

    await User.findOneAndRemove({ _id: id }).catch(() => {
      return res.status(404).json({ msg: "Error in find user" });
    });

    res.json({ success: true });
  }
);

/* -------------------------------------------------------------------------- */

module.exports = router;
