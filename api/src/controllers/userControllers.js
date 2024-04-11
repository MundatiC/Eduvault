
async function getUsers(req, res){
    const { pool } = req;
    if(pool.connected){
        try {
            let results = await pool
                .request()
                .execute("GetAllStudents");
                console.log(results.recordset);
                res.status(200).send(results.recordset);
        } catch (error) {
            res.status(500).send('Error fetching users');
        }
    }
}

async function getUserById(req,res){
    const { pool } = req;
    if(pool.connected){
        try {
            let results = await pool
                .request()
                .input("studentId", req.params.id)
                .execute("GetStudentById");
                console.log(results.recordset);
                res.status(200).send(results.recordset);
        } catch (error) {
            res.status(500).send('Error fetching user');
            console.log(error)
        }
    }
}

async function createUser(req, res){
    try {
        const { id, first_name, last_name, email, gender, date_of_birth } = req.body;
        const { pool } = req;
        if(pool.connected){
          let results = await pool
            .request()
            .input("id", id)
            .input("first_name", first_name)
            .input("last_name", last_name)
            .input("email", email)
            .input("gender", gender)
            .input("date_of_birth", date_of_birth)
            .execute("InsertStudent");
        if (results.rowsAffected[0] > 0) {
          res.status(200).send('Student data inserted successfully');
        }
        
        }
      } catch (error) {
        res.status(500).send('Error inserting student data');
        console.log(error)
      }
}

module.exports = { getUsers, getUserById, createUser  };