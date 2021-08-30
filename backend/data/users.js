import bcrypt from 'bcryptjs'

const users = [
    {
        name: "Fatih Çınar",
        email: "rea.fatihcinar@gmail.com",
        password: bcrypt.hashSync('123', 10),
        isAdmin: true
    },
    {
        name: "John Doe",
        email: "john@example.com",
        password: bcrypt.hashSync('123', 10),
        isAdmin: false
    },
    {
        name: "Jane Doe",
        email: "jane@example.com",
        password: bcrypt.hashSync('123', 10),
        isAdmin: false
    }

];

export default users