import mongoose from "mongoose";

mongoose.connect('mongodb+srv://ayushsoni0718:ayush08@Taskmanager@task-manager.mg1kju6.mongodb.net/users?retryWrites=true&w=majority&appName=task-manager', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('db connected'))
.catch(err => console.error(err));

export default mongoose;