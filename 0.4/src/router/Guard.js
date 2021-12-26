import {fAuth,fDb} from 'src/boot/firebase'
import {ref,get} from 'firebase/database'
function IsUser()
{
  if(fAuth.currentUser)
  {
    console.log("Triggered! ",fAuth.currentUser.uid)
    return true
  }
  else{
    console.log("Not Logged")
    return false
  }

}
async function IsSuperuser()
{
  if(fAuth.currentUser)
  {
    const getSuperAdmin=await get(ref(fDb,"users/"+fAuth.currentUser.uid+"/SuperAdmin"))
    console.log("Superuser",getSuperAdmin.val())
    if(getSuperAdmin.val())
    {
      return true
    }else{
      return false
    }
  }
  else{
    console.log("Not Logged")
    return false
  }

}
export {IsUser,IsSuperuser}
