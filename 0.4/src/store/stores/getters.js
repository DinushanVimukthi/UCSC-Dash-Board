const Tcourses=(state)=>{
    let Todaycourses ={}
    // console.log(state.courses);
    Object.keys(state.courses).forEach(key=>{
        // console.log(key,value);
        if(state.courses[key].Day=="Monday"){
            // console.log("Detected",key);
            Todaycourses[key]=state.courses[key]
        }

    })
    // console.log(Todaycourses);
    return Todaycourses
    // return state.courses

}
const UserAdmin=(state)=>{
  if(state.users.Data)
  {
    console.log(state.users.Data)
    return state.users.Data.admin
  }
  else
  {
    return null
  }
  
}
const User=(state)=>{
  return state.users.Data
}
const UserID=(state)=>{
  return state.users.ID
}
const All_users=(state)=>{
  return state.Allusers
}
const GetUsername=(state)=>{
  if(state.users.Data){
    let username=state.users.Data.name;
  if(username.indexOf(" ")>0)
    username=username.substring(0,username.indexOf(" "));
  console.log("First name",username);
  return username
  }
  else{
    return "My App"
  }
  
}
const IsSuperAdmin=(state)=>{
  if(state.users.Data)
  {
    console.log(state.users.Data)
    return state.users.Data.SuperAdmin
  }
  else
  {
    return null
  }
}
const getpic=(state)=>{
  if(state.users.Data)
  {
    console.log(state.users.Data)
    return state.users.Data.Url
  }
  else
  {
    return null
  }
}
const courses=(state)=>{
  let Todaycourses ={}
  // console.log(state.courses);
  Object.keys(state.courses).forEach(key=>{
    // console.log(key,value);
    if(state.courses[key].Day=="Monday"){
      // console.log("Detected",key);
      Todaycourses[key]=state.courses[key]
    }

  })
  // console.log(Todaycourses);
  // return Todaycourses
  return state.courses

}
const AllcoursesID=(state)=>{
    let AllCourses=[]
    Object.keys(state.courses).forEach(key=>{
        let coursename=key.substring(0,7);
        console.log(coursename);
        let coursetype=key.substring(7,10);
        let fullcoursenametype;
        if(coursetype=="PS")
        {
          fullcoursenametype="Practical Session"
        }
        else if(coursetype=="TS")
        {
          fullcoursenametype="Tutorial Session"
        }
        else if(coursetype=="LS")
        {
          fullcoursenametype="Live Session"
        }
        let fullname=coursename+" "+fullcoursenametype;
        console.log(coursetype);
        AllCourses.push(fullname)
    })
    console.log(AllCourses);
    return AllCourses
}
export {courses,AllcoursesID,Tcourses,UserAdmin,All_users,IsSuperAdmin,getpic,User,UserID,GetUsername}