import Record from '../models/Record.js'
import User from '../models/User.js'

export const countHowManyActive = async (req, res) => {
    try {
        Record.count({isArchived: false}, (err, count) => {
            return res.status(200).json(count);
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send(`Server error ${err}`);
    }
}

export const countHowManyHstorical = async (req, res) => {
    try {
        Record.count({isArchived: true}, (err, count) => {
            return res.status(200).json(count);
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send(`Server error ${err}`);
    }
}

export const createRecord = async (req, res) => {
    
    try {
         // check if the user is an Admin
         const user = await User.findOne({ _id : req.body.userId });
         if (user === null) {
             return res.status(404).send(`User was not found, please include userId`)
         }

        const newRecord = new Record({
            creatorId: req.body.userId,
            locationId: req.body.locationId,
            type: req.body.type,
            severity: req.body.severity,
            details: req.body.details,
        });

        const record = await  newRecord.save();
        return res.status(201).send(`record ${record._id} created.`);
      }
      
      catch(err) {
          console.log(err);
          return res.status(500).send(`Server error ${err}`);
      }
};

export const indexActiveRecords = async (req, res) => {
    
    try {       
         // get all records
        const records = await Record.find({'isArchived': 'false'});
        return res.status(200).json(records)
      }
      catch(err) {
          return res.status(500).send(err);
      }
};

export const indexHistoricalRecords = async (req, res) => {
    
    try {
        // get all records
        const records = await Record.find({'isArchived': 'true'});
        return res.status(200).json(records)

      }
      catch(err) {
          return res.status(500).send(err);
      }
};

export const indexAllRecords = async (req, res) => {
    
    try {
        // get all records
        const records = await Record.find();
        return res.status(200).json(records)

      }
      catch(err) {
          return res.status(500).send(err);
      }
};



export const showRecord = async (req, res) => {
    try { 
        // get single record
        const record = await Record.findById(req.params.id);
        if (!record) { return res.status(404).send("Record not found.") }
        return res.status(200).json(record);
    }
    catch(err) {
        return res.status(500).json(err);
    } 
};


export const updateRecord = async (req, res) => {
    try {
        // check if the user exists
        const user = await User.findOne({ _id : req.body.userId });
        if (user === null) {
            return res.status(404).send(`User was not found, please provide valid userId`)
        }

        // check if this record id exists
        const check = await Record.findOne({_id: req.params.id});
        if (check === null) {
            return res.status(404).send(`Record not found`)
        }



        // if the user is not admin, check if it is record owner
        if (!user.isAdmin) {
            // if user is record owner
            if (userId === check.creatorId) {


            }
            else {
                return res.status(400).send(`User is not admin or the record owner, cannot update record!`)
            }
        }

        // if user is admin
        else {

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

export const archiveRecord = async (req, res) => {
    
    try {
        // check if the user is an Admin
        const user = await User.findOne({ _id : req.body.userId });
        if (user === null) {
            return res.status(404).send(`User was not found, please provide userId`)
        }
        if (!user.isAdmin) {
            return res.status(400).send(`User is not admin, cannot update records!`)
        }

      // check if this record id exists
      const check = await Record.findOne({_id: req.params.id});
      if (check === null) {
            return res.status(404).send(`Record not found`)
      }

    // update Record object
    await Record.findByIdAndUpdate( req.params.id, {
        isArchived: true
      })
      return res.status(201).send(`Record ${req.params.id} archived.`);
    }

    catch (err) {
        console.log(err);
        return res.status(500).send(`Server error ${err}`);
    }
};

export const unarchiveRecord = async (req, res) => {
    
    try {
        // check if the user is an Admin
        const user = await User.findOne({ _id : req.body.userId });
        if (user === null) {
            return res.status(404).send(`User was not found, please provide userId`)
        }
        if (!user.isAdmin) {
            return res.status(400).send(`User is not admin, cannot update records!`)
        }

      // check if this record id exists
      const check = await Record.findOne({_id: req.params.id});
      if (check === null) {
            return res.status(404).send(`Record not found`)
      }

    // update Record object
    await Record.findByIdAndUpdate( req.params.id, {
        isArchived: false
      })
      return res.status(201).send(`Record ${req.params.id} unarchived.`);
    }

    catch (err) {
        console.log(err);
        return res.status(500).send(`Server error ${err}`);
    }
};


export const deleteRecord = async (req, res) => {
    
    try {
        // check if the user is an Admin
        const user = await User.findOne({ _id : req.body.userId });
        if (user === null) {
            return res.status(404).send(`User was not found, please include userId`)
        }
        if (!user.isAdmin) {
          return res.status(400).send(`User is not admin, cannot delete records!`)
      }

      const deletedRecord = await Record.findByIdAndRemove(req.params.id);
      res.status(200).json({msg: `Record deleted: ${req.params.id}`, deletedRecord});
    }
    catch (err) {
        console.log(err);
        return res.status(500).send(`Server error ${err}`);
    }
};
