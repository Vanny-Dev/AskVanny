import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './src/models/User';

dotenv.config();

const setupLoginUsername = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('MongoDB Connected');

    // Update the user with username 'vannydev' to have loginUsername 'vannythedeveloper'
    const result = await User.findOneAndUpdate(
      { username: 'vannydev' },
      { 
        $set: { 
          loginUsername: 'vannythedeveloper' 
        } 
      },
      { new: true }
    );

    if (result) {
      console.log('✅ Login username updated successfully!');
      console.log(`Public username: ${result.username}`);
      console.log(`Login username: ${result.loginUsername}`);
    } else {
      console.log('❌ User "vannydev" not found. Creating new user...');
      
      // Create the user if not exists
      const newUser = await User.create({
        username: 'vannydev',
        loginUsername: 'vannythedeveloper'
      });
      
      console.log('✅ User created successfully!');
      console.log(`Public username: ${newUser.username}`);
      console.log(`Login username: ${newUser.loginUsername}`);
    }

    await mongoose.disconnect();
    console.log('✅ Done!');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

setupLoginUsername();