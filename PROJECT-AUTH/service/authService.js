
const  mapToUserWithSessionID = new Map();


function  setUser( id ,user)
{
     mapToUserWithSessionID.set(id,user);
}

function getUser(id)
{
     return mapToUserWithSessionID.get(id);

}



module.exports = {setUser,getUser}