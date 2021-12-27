const Tcourses=(state)=>{
    let Todaycourses ={}
    // console.log(state.courses);
    Object.keys(state.courses).forEach(key=>{
        // console.log(key,value);
        if(state.courses[key].Day==state.Today){
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
    // console.log(state.users.Data)
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
    // console.log(state.users.Data)
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
    // console.log(state.users.Data)
    return state.users.Data.Url
  }
  else
  {
    return null
  }
}
const courses=(state)=>{
  return state.courses
}
const GetSpecialEventsID=(state)=>{
  let EventID=[]
  Object.keys(state.Special_Events).forEach(key=>{
    // console.log(key,value);
    EventID.push(key)
  })
  return EventID
  // return state.SpecialEventsID
}
const AllcoursesID=(state)=>{
 
    let AllCoursesID=[]
    Object.keys(state.courses).forEach(key=>{
        // let coursename=key.substring(0,7);
        // console.log(coursename);
        // let coursetype=key.substring(7,10);
        // let fullcoursenametype;
        // if(coursetype=="PS")
        // {
        //   fullcoursenametype="Practical Session"
        // }
        // else if(coursetype=="TS")
        // {
        //   fullcoursenametype="Tutorial Session"
        // }
        // else if(coursetype=="LS")
        // {
        //   fullcoursenametype="Live Session"
        // }
        // let fullname=coursename+" "+fullcoursenametype;
        // console.log(coursetype);
        // AllCoursesID.push(fullname)
        AllCoursesID.push(key)
    })

    console.log(AllCoursesID);
    return AllCoursesID
}
const GetFullname=(state)=>{
    return state.users.Data.name;
}
const SecondSemExam=(state)=>{
  return state.SemesterExamTime.Second
}
const GetSpecialEvents=(state)=>{
  return state.Special_Events
}
export {GetSpecialEventsID,courses,AllcoursesID,Tcourses,UserAdmin,All_users,IsSuperAdmin,getpic,User,UserID,GetUsername,GetFullname,SecondSemExam,GetSpecialEvents}
