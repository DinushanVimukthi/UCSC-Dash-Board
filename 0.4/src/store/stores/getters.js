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
  let SpecialEvents={}
  Object.keys(state.Special_Events).forEach(key=>{

    if(state.Special_Events[key].IsSpecial)
    {
      SpecialEvents[key]=state.Special_Events[key]
    }
  })
  return SpecialEvents
}
const GetNormalEvents=(state)=>{
  let NormalEvents={}
  Object.keys(state.Special_Events).forEach(key=>{

    if(!state.Special_Events[key].IsSpecial)
    {
      NormalEvents[key]=state.Special_Events[key]
    }
  })
  return NormalEvents
}

// const GetSpecialEvents=(state)=>{
//   let SpecialEvents={}
//   return state.Special_Events
// }

const GetAllEvents=(state)=>{
  return state.Special_Events
}
const GetUpcomingEvents=(state)=>{
  let UpcomingEvents={}
  Object.keys(state.Special_Events).forEach(key=>{
    let coursemodedTime = state.Special_Events[key].Time
    // coursemodedTime = ((coursemodedTime.split(" ")[1] == 'PM' ? (parseInt(coursemodedTime.split(":")[0]) + 12) : coursemodedTime.split(":")[0]) + ":" + coursemodedTime.split(":")[1] + ":" + coursemodedTime.split(":")[2]).substring(0, 8)
    // console.log(coursemodedTime);
    let coursemodedDay = state.Special_Events[key].Date
    
  
    let Dates = new Date()
    let leftdate = new Date(coursemodedDay.split("/")[2], coursemodedDay.split("/")[0] - 1, coursemodedDay.split("/")[1], coursemodedTime.split(":")[0], coursemodedTime.split(":")[1], coursemodedTime.split(":")[2])
    let DifferDays = Math.floor(Math.abs(Dates.getTime() - leftdate.getTime()) / (1000 * 60*60*24))
    console.log(key,DifferDays);
    if(DifferDays<7)
    {
      // UpcomingEvents[key]=state.Special_Events[key]
      UpcomingEvents[key]=DifferDays
    }
  }
  )
  console.log(UpcomingEvents);
  return UpcomingEvents
}
const Get_Assignments=(state)=>{
  console.log(state);
  return 'state.Assignments'
}
export {Get_Assignments,GetUpcomingEvents,GetNormalEvents,GetAllEvents,GetSpecialEventsID,courses,AllcoursesID,Tcourses,UserAdmin,All_users,IsSuperAdmin,getpic,User,UserID,GetUsername,GetFullname,SecondSemExam,GetSpecialEvents}
