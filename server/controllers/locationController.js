import bcrypt from 'bcrypt'
import Location from '../models/Location.js'


export const createLocation = async (req, res) => {
    
    try {
        // check if the user is an Admin
        const user = await User.findOne({ _id : req.body.userId });
        if (user === null) {
            return res.status(404).send(`User was not found, please include userId`)
        }
        if (!user.isAdmin) {
          return res.status(400).send(`User is not admin, cannot create locations!`)
      }

      // new location object
      const newLocation = new Location({
        creatorId: req.body.userId,
        name: req.body.name,
        description: req.body.description,
        coordinates: req.body.coordinates,
        isArchived: req.body.isArchived
      });

      const location = await newLocation.save();
      return res.status(201).send(`location ${location._id} created.`);
    }
    catch(err) {
        console.log(err);
        return res.status(500).send(`Server error ${err}`);
    }
};


export const indexLocations = async (req, res) => {

    try { 
        // get all locations
        const locations = await Location.find();
        return res.status(200).json(locations);
    }
    catch(err) {
        return res.status(500).json(err);
    } 
};


export const showLocation = async (req, res) => {
    
    try { 
        // get single location
        const location = await Location.findById(req.params.id);
        if (!location) { return res.status(404).send("Location not found.") }
        return res.status(200).json(location);
    }
    catch(err) {
        return res.status(500).json(err);
    } 
};


export const updateLocation = async (req, res) => {
    
    try {
        // check if the user is an Admin
        const user = await User.findOne({ _id : req.body.userId });
        if (user === null) {
            return res.status(404).send(`User was not found, please provide userId`)
        }
        if (!user.isAdmin) {
            return res.status(400).send(`User is not admin, cannot update locations!`)
        }


      // check if this location id exists
      const check = await Location.findOne({_id: req.params.id});
      if (check === null) {
            return res.status(404).send(`Location not found`)
      }

    // if coords are included in the request, check if the desired coords aren't already taken
    if (req.body.coordinates) {
        const coordCheck = await Location.findOne({coordinates: req.body.coordinates});
        if (coordCheck !== null) {
            if (coordCheck.id !== check.id) {
                return res.status(400).send(`A location already has these coordinates`)
            }
        }
    }

    // update location object
    await Location.findByIdAndUpdate( req.params.id, {
        name: req.body.name,
        description: req.body.description,
        coordinates: req.body.coordinates,
        isArchived: req.body.isArchived
      })

      const updatedLocation = await Location.findOne({ _id: req.params.id})
     
      return res.status(201).send(`Space ${req.params.id} (@${updatedLocation.coordinates}) updated.`);

    }

    catch (err) {
        console.log(err);
        return res.status(500).send(`Server error ${err}`);
    }
};


export const archiveLocation = async (req, res) => {
    
    try {
        // check if the user is an Admin
        const user = await User.findOne({ _id : req.body.userId });
        if (user === null) {
            return res.status(404).send(`User was not found, please provide userId`)
        }
        if (!user.isAdmin) {
            return res.status(400).send(`User is not admin, cannot update locations!`)
        }


      // check if this location id exists
      const check = await Location.findOne({_id: req.params.id});
      if (check === null) {
            return res.status(404).send(`Location not found`)
      }

    // update location object
    await Location.findByIdAndUpdate( req.params.id, {
        isArchived: "True"
      })

      const updatedLocation = await Location.findOne({ _id: req.params.id})
     
      return res.status(201).send(`Space ${req.params.id} (@${updatedLocation.coordinates}) archived.`);

    }

    catch (err) {
        console.log(err);
        return res.status(500).send(`Server error ${err}`);
    }
};


export const deleteLocation = async (req, res) => {
    
    try {
        // check if the user is an Admin
        const user = await User.findOne({ _id : req.body.userId });
        if (user === null) {
            return res.status(404).send(`User was not found, please include userId`)
        }
        if (!user.isAdmin) {
          return res.status(400).send(`User is not admin, cannot delete locations!`)
      }

      const deletedLocation = await Location.findByIdAndRemove(req.params.id);
      res.status(200).json({msg: `Location deleted: ${req.params.id}`, deletedLocation});
    }
    catch (err) {
        console.log(err);
        return res.status(500).send(`Server error ${err}`);
    }
};


