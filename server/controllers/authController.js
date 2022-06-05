import bcrypt from 'bcrypt'
import User from '../models/User.js'


export const login = async (req, res) => {
    try {

        // trim and make lowercase
          const email = req.body.email.toLowerCase().trim();
          const pword = req.body.pword;
  
          // check if this user already exists
          const user = await User.findOne({email: email});
          if (user === null) {
              return res.status(404).send(`User not found`)
          }
  
          // check if password is correct
          bcrypt.compare(pword, user.pword, (err, result) => {
              if (err) {
                return res.status(500).send(`Server error`);
              }
              else {
                  if (result) {
                    return res.status(200).send(`User ${user._id} (${user.fname} ${user.lname}) logged in.`);
                  }
                  else {
                    return res.status(400).send(`Incorrect password!`)
                  }
              }

          });
  
      }
      catch(err) {
          return res.status(500).send(`Server error`);
      }
};

export const logout = async (req, res) => {
    
    try {
        return res.status(200).send(`Logged user out.`)

      }
      catch(err) {
          return res.status(500).send(`Server error`);
      }
};


export const register = async (req, res) => {

    try {

        // check none of the fields are empty
        if (!req.body.name) { return res.status(400).send(`Field 'name' cannot be null!`);}
        if (!req.body.email) { return res.status(400).send(`Field 'email' cannot be null!`);}
        if (!req.body.pword) { return res.status(400).send(`Field 'pword' cannot be null!`);}

        // trim and make lowercase
        const name = req.body.name.toLowerCase().trim();
        const email = req.body.email.toLowerCase().trim();

        // check if this user already exists
        const userCheck = await User.findOne({email: email});
        if (userCheck != null) {
            return res.status(400).send(`User with this email already exists: ${email}`)
        }

        // hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.pword, salt);

        // new user object
        const newUser = new User({
            name: name,
            email: email,
            pword: hashedPassword
        });

        const user = await newUser.save();
        return res.status(201).send(`User ${user._id} (${name}) created.`);
    }
    
    catch(err) {
        return res.status(500).send(`Server error`);
    }
    
};