<template>
  <div>
    <q-splitter v-model="splitterModel" style="height: auto">
      <template v-slot:before>
        <q-tabs v-model="tab" vertical class="text-teal q-ma-lg">
          <q-tab name="Lectures" icon="library_books" label="Lectures" />
          <q-tab v-if="UserAdmin" name="Admin" icon="library_books" label="Admin Board" />
          <q-tab name="events" icon="timer" label="Special Events" />
          <q-tab v-show="false" disable name="alarms" icon="alarm" label="Alarms" />
        </q-tabs>
      </template>
      <template v-slot:after>
        <q-tab-panels
          v-model="tab"
          animated
          vertical
          transition-prev="jump-up"
          transition-next="jump-up"
        >
          <q-tab-panel name="Lectures">
            <div class="text-h4">Today Lectures</div>
            <div v-if="!TodayCourses">No Courses Found!</div>
            <div class="flex flex-center">
              <q-card
                dark
                bordered
                :class="(!$q.dark.isActive ? 'bg-blue-7 ' : 'bg-grey-9 ') + 'my-card q-ma-md'"
                v-for="(courses,ID) in Tcourses"
                :key="ID"
              >
                <q-card-section class="flex flex-center column">
                  <div class="text-h4" style="text-align: center">
                    {{ courses.CourseName }}
                    <div class="text-h6">{{ courses.Lecturer }}</div>
                  </div>
                  <div class="text-h6 q-ma-sm" style="text-align:center; width:fit-content">
                    Time:-
                    <div class="bg-primary">{{ courses.StartTime }} - {{ courses.EndTime }}</div>
                  </div>
                  <div class="text-h6 q-ma-sm" style="text-align: center">
                    Updated By:
                    <div class="bg-positive">{{ courses.lastmodified }}</div>
                  </div>
                  <div class="text-h6 q-ma-sm" style="text-align:center; width:fit-content">
                    Last Modified Time :
                    <div class="bg-positive">{{ GetModifiedTime(ID) }}</div>
                  </div>
                  <div class="text-h6 q-ma-sm" style="text-align: center">
                    <q-btn
                      label="Join Now "
                      type="a"
                      :href="courses.link"
                      target="_blank"
                      color="red"
                    />
                  </div>
                  <div class="absolute-bottom-right q-ma-sm" v-if="courses.Recurring">
                    RM
                    <q-tooltip class="bg-primary">Recurring Meeting</q-tooltip>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </q-tab-panel>

          <q-tab-panel v-if="UserAdmin" name="Admin">
            <div class="text-h4 q-ma-lg">Manage Lectures</div>
            <div class="flex flex-center">
              <q-card
                :class="$q.dark.isActive ? 'bg-green-2 flex flex-center q-pa-md q-ma-lg my-card2 cursor-pointer' : 'bg-green-7 flex flex-center q-pa-md q-ma-lg my-card2 cursor-pointer'"
                @click="Adddialog = true"
              >
                <q-img
                  src="https://firebasestorage.googleapis.com/v0/b/studentapp-5773b.appspot.com/o/icons%2FAdd.png?alt=media&token=03af4e0d-4f7f-4684-a575-b9b39301f4cf"
                  style="width:200px; height:200px"
                >
                  <div class="absolute-bottom text-subtitle2 text-center">Add New Course</div>
                  <q-tooltip
                    class="bg-indigo text-body2"
                    :offset="[10, 10]"
                    transition-show="rotate"
                    transition-hide="rotate"
                  >Add new Course</q-tooltip>
                </q-img>
              </q-card>

              <q-card
                v-if="CoursesFound"
                :class="$q.dark.isActive ? 'bg-yellow-2 cursor-pointer flex flex-center q-pa-md q-ma-lg my-card2' : 'cursor-pointer bg-yellow-7 flex flex-center q-pa-md q-ma-lg my-card2'"
                @click="Editdialogox"
              >
                <q-img
                  src="https://firebasestorage.googleapis.com/v0/b/studentapp-5773b.appspot.com/o/icons%2FEdit.png?alt=media&token=52ff3939-3709-47e8-baa9-706b140a6334"
                  style="width:200px; height:200px"
                >
                  <div class="absolute-bottom text-subtitle2 text-center">Edit Course</div>
                  <q-tooltip
                    class="bg-positive text-body2"
                    :offset="[10, 10]"
                    transition-show="rotate"
                    transition-hide="rotate"
                  >Edit A Course</q-tooltip>
                </q-img>
              </q-card>
              <q-card
                v-if="CoursesFound"
                :class="$q.dark.isActive ? 'cursor-pointer bg-red-2 flex flex-center q-pa-md q-ma-lg my-card2' : 'cursor-pointer bg-red-7 flex flex-center q-pa-md q-ma-lg my-card2'"
                @click="Deletedialog = true"
              >
                <q-img
                  src="https://firebasestorage.googleapis.com/v0/b/studentapp-5773b.appspot.com/o/icons%2FDelete.png?alt=media&token=280d8d68-130a-401e-9858-8ce95d87cfb7"
                  style="width:200px; height:200px"
                >
                  <div class="absolute-bottom text-subtitle2 text-center">Delete Course</div>
                  <q-tooltip
                    class="bg-red text-body2"
                    :offset="[10, 10]"
                    transition-show="rotate"
                    transition-hide="rotate"
                  >Delete A Course</q-tooltip>
                </q-img>
              </q-card>
            </div>
            <div class="text-h4 q-ma-lg">Manage Events</div>
            <div class="flex flex-center">
              <q-card
                :class="$q.dark.isActive ? 'bg-green-2 flex flex-center q-pa-md q-ma-lg my-card2 cursor-pointer' : 'bg-green-7 flex flex-center q-pa-md q-ma-lg my-card2 cursor-pointer'"
                @click="Addevent = true"
              >
                <q-img
                  src="https://firebasestorage.googleapis.com/v0/b/studentapp-5773b.appspot.com/o/icons%2FAdd.png?alt=media&token=03af4e0d-4f7f-4684-a575-b9b39301f4cf"
                  style="width:200px; height:200px"
                >
                  <div class="absolute-bottom text-subtitle2 text-center">Add Event</div>
                  <q-tooltip
                    class="bg-primary text-body2"
                    :offset="[10, 10]"
                    transition-show="rotate"
                    transition-hide="rotate"
                  >Add An Event</q-tooltip>
                </q-img>
              </q-card>
              <q-card
                v-if="GetSpecialEventsID.length > 0"
                :class="$q.dark.isActive ? 'bg-yellow-2 cursor-pointer flex flex-center q-pa-md q-ma-lg my-card2' : 'cursor-pointer bg-yellow-7 flex flex-center q-pa-md q-ma-lg my-card2'"
                @click="EditeventDialog"
              >
                <q-img
                  src="https://firebasestorage.googleapis.com/v0/b/studentapp-5773b.appspot.com/o/icons%2FEdit.png?alt=media&token=52ff3939-3709-47e8-baa9-706b140a6334"
                  style="width:200px; height:200px"
                >
                  <div class="absolute-bottom text-subtitle2 text-center">Edit Event</div>
                  <q-tooltip
                    class="bg-positive text-body2"
                    :offset="[10, 10]"
                    transition-show="rotate"
                    transition-hide="rotate"
                  >Edit An Event</q-tooltip>
                </q-img>
              </q-card>
              <q-card
                :class="$q.dark.isActive ? 'cursor-pointer bg-red-2 flex flex-center q-pa-md q-ma-lg my-card2' : 'cursor-pointer bg-red-7 flex flex-center q-pa-md q-ma-lg my-card2'"
                @click="RemoveEventDialog"
              >
                <q-img
                  src="https://firebasestorage.googleapis.com/v0/b/studentapp-5773b.appspot.com/o/icons%2FDelete.png?alt=media&token=280d8d68-130a-401e-9858-8ce95d87cfb7"
                  style="width:200px; height:200px"
                >
                  <div class="absolute-bottom text-subtitle2 text-center">Remove Event</div>
                  <q-tooltip
                    class="bg-red text-body2"
                    :offset="[10, 10]"
                    transition-show="rotate"
                    transition-hide="rotate"
                  >Remove An Event</q-tooltip>
                </q-img>
              </q-card>
            </div>
            <div class="q-pa-md q-gutter-sm">
              <q-dialog v-model="confirm" persistent>
                <q-card class="delprompt">
                  <q-card-section class="row items-center">
                    <q-avatar class="bg-red" icon="warning" color="primary" text-color="white" />
                    <span class="q-ml-sm text-red text-dark">Are You Sure to Delete Course?</span>
                  </q-card-section>
                  <q-card-actions align="right">
                    <q-btn class="bg-primary" flat label="Cancel" color="white" v-close-popup />
                    <q-btn class="bg-red" flat label="Delete" color="white" @click="RemoveCourses" />
                  </q-card-actions>
                </q-card>
              </q-dialog>

              <q-dialog v-model="eventconfirm" persistent>
                <q-card class="delprompt">
                  <q-card-section class="row items-center">
                    <q-avatar class="bg-red" icon="warning" color="primary" text-color="white" />
                    <span class="q-ml-sm text-red text-dark">Are You Sure to Delete Event?</span>
                  </q-card-section>
                  <q-card-actions align="right">
                    <q-btn class="bg-primary" flat label="Cancel" color="white" v-close-popup />
                    <q-btn class="bg-red" flat label="Delete" color="white" @click="RemoveEvent" />
                  </q-card-actions>
                </q-card>
              </q-dialog>

              <q-dialog
                v-model="Deletedialog"
                persistent
                :maximized="maximizedToggle"
                transition-show="slide-up"
                transition-hide="slide-down"
              >
                <q-card class="bg-secondary text-white DialogBox">
                  <q-bar>
                    <q-space />

                    <q-btn
                      dense
                      flat
                      icon="minimize"
                      @click="maximizedToggle = false"
                      :disable="!maximizedToggle"
                    >
                      <q-tooltip v-if="maximizedToggle" class="bg-white text-primary">Minimize</q-tooltip>
                    </q-btn>
                    <q-btn
                      dense
                      flat
                      icon="crop_square"
                      @click="maximizedToggle = true"
                      :disable="maximizedToggle"
                    >
                      <q-tooltip v-if="!maximizedToggle" class="bg-white text-primary">Maximize</q-tooltip>
                    </q-btn>
                    <q-btn dense flat icon="close" v-close-popup @click="ClearAll">
                      <q-tooltip class="bg-white text-primary">Close</q-tooltip>
                    </q-btn>
                  </q-bar>

                  <q-card-section>
                    <div class="text-h6">Delete Course</div>
                  </q-card-section>

                  <q-card-section class="q-pt-none text-white">
                    <q-select v-model="model" :options="AllcoursesID" label="All Courses" />
                    <q-btn label="Delete Course" @click="confirm = true" />
                  </q-card-section>
                </q-card>
              </q-dialog>
              <q-dialog
                v-model="Editdialog"
                persistent
                :maximized="maximizedToggle"
                transition-show="slide-up"
                transition-hide="slide-down"
              >
                <q-card class="bg-secondary text-white DialogBox">
                  <q-bar>
                    <q-space />

                    <q-btn
                      dense
                      flat
                      icon="minimize"
                      @click="maximizedToggle = false"
                      :disable="!maximizedToggle"
                    >
                      <q-tooltip v-if="maximizedToggle" class="bg-white text-primary">Minimize</q-tooltip>
                    </q-btn>
                    <q-btn
                      dense
                      flat
                      icon="crop_square"
                      @click="maximizedToggle = true"
                      :disable="maximizedToggle"
                    >
                      <q-tooltip v-if="!maximizedToggle" class="bg-white text-primary">Maximize</q-tooltip>
                    </q-btn>
                    <q-btn dense flat icon="close" v-close-popup @click="ClearAll">
                      <q-tooltip class="bg-white text-primary">Close</q-tooltip>
                    </q-btn>
                  </q-bar>

                  <q-card-section>
                    <div class="text-h6">Edit Course</div>
                  </q-card-section>

                  <q-card-section class="q-pt-none text-white">
                    <q-form>
                      <q-select v-model="model" :options="AllcoursesID" label="All Courses" />
                      <span>
                        Lecturer Name:
                        <q-input
                          filled
                          :placeholder="courses[model].Lecturer"
                          v-model="tmpLecturer"
                          :dense="dense"
                        />
                      </span>
                      <span>
                        Lecture Day:
                        <q-select v-model="tmpDay" :options="Days" label="Select Day" />
                      </span>
                      <span>
                        Lecture Start Time:
                        <q-input
                          label="StartTime"
                          v-model="tmpStartTime"
                          mask="time"
                          :rules="['time']"
                        >
                          <template v-slot:append>
                            <q-icon name="access_time" class="cursor-pointer">
                              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                <q-time v-model="tmpStartTime">
                                  <div class="row items-center justify-end">
                                    <q-btn v-close-popup label="Close" color="primary" flat />
                                  </div>
                                </q-time>
                              </q-popup-proxy>
                            </q-icon>
                          </template>
                        </q-input>
                      </span>
                      <span>
                        Lecture End Time:
                        <q-input
                          filled
                          label="EndTime"
                          v-model="tmpEndTime"
                          mask="time"
                          :rules="['time']"
                        >
                          <template v-slot:append>
                            <q-icon name="access_time" class="cursor-pointer">
                              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                <q-time v-model="tmpEndTime">
                                  <div class="row items-center justify-end">
                                    <q-btn v-close-popup label="Close" color="primary" flat />
                                  </div>
                                </q-time>
                              </q-popup-proxy>
                            </q-icon>
                          </template>
                        </q-input>
                      </span>
                      <span>
                        Lecture Link:{{ tmpRecurringlink }}
                        <q-toggle v-model="tmpRecurringlink" color="red" />
                        <span class="text-yellow">{{ tmpRecurringlink ? "Recurring Meeting" : "" }}</span>
                        <q-input filled v-model="tmplink" :dense="dense" />
                      </span>

                      <q-btn label="Update Course" @click="UpdateCourse" />
                    </q-form>
                  </q-card-section>
                </q-card>
              </q-dialog>

              <q-dialog
                v-model="Adddialog"
                persistent
                :maximized="maximizedToggle"
                transition-show="slide-up"
                transition-hide="slide-down"
              >
                <q-card class="bg-secondary text-white DialogBox">
                  <q-bar>
                    <q-space />

                    <q-btn
                      dense
                      flat
                      icon="minimize"
                      @click="maximizedToggle = false"
                      :disable="!maximizedToggle"
                    >
                      <q-tooltip v-if="maximizedToggle" class="bg-white text-primary">Minimize</q-tooltip>
                    </q-btn>
                    <q-btn
                      dense
                      flat
                      icon="crop_square"
                      @click="maximizedToggle = true"
                      :disable="maximizedToggle"
                    >
                      <q-tooltip v-if="!maximizedToggle" class="bg-white text-primary">Maximize</q-tooltip>
                    </q-btn>
                    <q-btn dense flat icon="close" v-close-popup @click="ClearAll">
                      <q-tooltip class="bg-white text-primary">Close</q-tooltip>
                    </q-btn>
                  </q-bar>

                  <q-card-section>
                    <div class="text-h6">Add New Course</div>
                  </q-card-section>

                  <q-card-section class="q-pt-none text-white">
                    <q-form @submit="AddCourse">
                      <q-select v-model="newcourse" :options="tmpcourse" label="Select Course" />
                      <q-select
                        v-model="newcoursetype"
                        :options="tmpcoursetype"
                        label="Select Course Type"
                      />

                      <q-input
                        v-model="tmpLecturer"
                        label="Lecturer Name"
                        placeholder="eg:- Dr. Noel Fernando"
                        color="white"
                        lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please type something']"
                      />
                      <!--                      <q-input-->
                      <!--                        v-model="tmpDay"-->
                      <!--                        label="Course Day"-->
                      <!--                        placeholder="eg:- Monday"-->
                      <!--                        color="white"-->
                      <!--                        lazy-rules-->
                      <!--                        :rules="[val => val && val.length > 0 || 'Please type something']"-->
                      <!--                      />-->
                      <q-select v-model="tmpDay" :options="Days" label="Select Day" />
                      <q-input
                        label="StartTime"
                        v-model="tmpStartTime"
                        mask="time"
                        :rules="['time']"
                      >
                        <template v-slot:append>
                          <q-icon name="access_time" class="cursor-pointer">
                            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                              <q-time v-model="tmpStartTime">
                                <div class="row items-center justify-end">
                                  <q-btn v-close-popup label="Close" color="primary" flat />
                                </div>
                              </q-time>
                            </q-popup-proxy>
                          </q-icon>
                        </template>
                      </q-input>

                      <q-input label="EndTime" v-model="tmpEndTime" mask="time" :rules="['time']">
                        <template v-slot:append>
                          <q-icon name="access_time" class="cursor-pointer">
                            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                              <q-time v-model="tmpEndTime">
                                <div class="row items-center justify-end">
                                  <q-btn v-close-popup label="Close" color="primary" flat />
                                </div>
                              </q-time>
                            </q-popup-proxy>
                          </q-icon>
                        </template>
                      </q-input>
                      <div>
                        Recurring Meeting
                        <q-toggle v-model="tmpRecurringlink" color="red" />
                        <span class="text-yellow">
                          <span v-if="tmpRecurringlink">Recurring Meeting</span>
                        </span>
                      </div>
                      <q-input
                        v-model="tmplink"
                        label="Lecture Link"
                        placeholder="eg:- 3.00"
                        color="white"
                        lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please type something']"
                      />
                      <q-btn label="Add Course" type="submit" />
                    </q-form>
                  </q-card-section>
                </q-card>
              </q-dialog>

              <q-dialog v-model="Addevent" persistent>
                <q-card class="Addevent">
                  <q-bar>
                    Add Event
                    <q-space />
                    <q-btn dense flat icon="close" v-close-popup @click="ClearAll">
                      <q-tooltip class="bg-white text-primary">Close</q-tooltip>
                    </q-btn>
                  </q-bar>
                  <q-card-section class="flex-flex-center">
                    <q-form @submit="Add_event">
                      <div class="full-width">
                        <q-input
                          class="q-ma-sm full-width"
                          filled
                          v-model="tmpEventName"
                          label="Event Name"
                          lazy-rules
                          :rules="[val => val && val.length > 3 || 'Please type something']"
                        />
                        <div class="q-gutter-sm">
                          <q-checkbox v-model="special" label="Special Event" />
                        </div>
                      </div>
                      <div class="q-ma-lg row items-start">
                        <q-date
                          v-model="tmpEventDate"
                          mask="MM-DD-YYYY HH:mm"
                          color="purple"
                          now-btn
                        />
                        <q-time
                          v-model="tmpEventDate"
                          mask="MM-DD-YYYY HH:mm"
                          color="purple"
                          now-btn
                        />
                      </div>
                      <q-btn
                        class="full-width"
                        color="grey-7"
                        text-color="black"
                        label="Add Event"
                        type="submit"
                      />
                    </q-form>
                  </q-card-section>
                </q-card>
              </q-dialog>

              <q-dialog v-model="Editevent" persistent>
                <q-card class="Addevent">
                  <q-bar>
                    Edit Event
                    <q-space />
                    <q-btn dense flat icon="close" v-close-popup>
                      <q-tooltip class="bg-white text-primary">Close</q-tooltip>
                    </q-btn>
                  </q-bar>
                  <q-card-section class="flex-flex-center">
                    <q-form @submit="EditEvent">
                      <q-select
                        v-model="EventID"
                        :options="GetSpecialEventsID"
                        label="All Events ID"
                      />
                      <div class="full-width">
                        <q-input
                          class="q-ma-sm full-width"
                          filled
                          v-model="tmpEventName"
                          label="Event Name"
                          lazy-rules
                          :rules="[val => val && val.length > 3 || 'Please type something']"
                        />
                        <div class="q-gutter-sm">
                          <q-checkbox v-model="special" label="Special Event" />
                        </div>
                      </div>
                      <div class="q-ma-lg row items-start">
                        <q-date
                          v-model="tmpEventDate"
                          mask="MM-DD-YYYY HH:mm"
                          color="purple"
                          now-btn
                        />
                        <q-time
                          v-model="tmpEventDate"
                          mask="MM-DD-YYYY HH:mm"
                          color="purple"
                          now-btn
                        />
                      </div>
                      <q-btn
                        class="full-width"
                        color="grey-7"
                        text-color="black"
                        label="Update Event"
                        type="submit"
                      />
                    </q-form>
                  </q-card-section>
                </q-card>
              </q-dialog>

              <q-dialog v-model="Removeevent" persistent>
                <q-card class="Addevent">
                  <q-bar>
                    Remove Event
                    <q-space />
                    <q-btn dense flat icon="close" v-close-popup>
                      <q-tooltip class="bg-white text-primary">Close</q-tooltip>
                    </q-btn>
                  </q-bar>
                  <q-card-section class="flex-flex-center">
                    <q-form @submit="eventconfirm = true">
                      <q-select
                        v-model="EventID"
                        :options="GetSpecialEventsID"
                        label="All Events ID"
                      />

                      <q-btn
                        class="full-width"
                        color="grey-7"
                        text-color="black"
                        label="Remove Event"
                        type="submit"
                      />
                    </q-form>
                  </q-card-section>
                </q-card>
              </q-dialog>
            </div>
          </q-tab-panel>

          <q-tab-panel name="alarms">
            <div class="text-h4 q-mb-md">Alarm</div>
            <div>Exam Day Counter</div>
            <Notification />

            <Fileuploader />
          </q-tab-panel>

          <q-tab-panel name="events">
            <div class="text-h4 q-mb-md">Events</div>
            <Notification />
          </q-tab-panel>
        </q-tab-panels>
      </template>
    </q-splitter>
  </div>
  <q-footer>
  <UpcomigSubmission/>
  </q-footer>
</template>
<script>
import { ref, watch } from "vue";
import { mapActions, mapGetters, useStore } from 'vuex'
import { useQuasar } from 'quasar'
import Fileuploader from "components/Fileuploader";
import Notification from "components/Notification";
import UpcomigSubmission from "components/UpcomigSubmission";
export default {
  setup() {
    const q = useQuasar();
    const tmpcourse = ['ENH1201 - Enhancement II', 'SCS1208 - Data Structure & Algorithm', 'SCS1209 - Object Oriented Programming', 'SCS1210 - Operating System', 'SCS1211 Mathematical Methods I', 'SCS1212 Foundations of Computer Science', 'SCS1213 Probability and Statistics', 'SCS1214 Operating Systems I',]
    const tmpcoursetype = ['Practical Session', 'Live Lectures', 'Tutorial Session']
    const Days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    const newcourse = ref('')
    const newcoursetype = ref('')
    const Dates = new Date()
    const Time = ref((Dates.getHours() > 12 ? Dates.getHours() - 12 : Dates.getHours()) + ":" + (Dates.getMinutes() >= 10 ? Dates.getMinutes() : "0" + Dates.getMinutes()) + ":" + (Dates.getSeconds() >= 10 ? Dates.getSeconds() : "0" + Dates.getSeconds()))
    const edited = ref(false)
    const model = ref("")
    const tmpLecturer = ref('')
    const tmpCourseName = ref('')
    const tmpDay = ref('')
    const tmpRecurringlink = ref(false)
    const tmpStartTime = ref('')
    const tmpEndTime = ref('')
    const tmpCoursename = ref('')
    const tmplink = ref('')
    const $store = useStore()
    const Editdialog = ref(false)
    const Editevent = ref(false)
    let tmpEventDate = ref('')
    let tmpEventName = ref('')
    let special = ref(false)
    const EventID = ref('')
    let GetAllEvents = $store.getters["stores/GetAllEvents"]
    watch(EventID, () => {
      console.log(EventID.value);
      if (Editevent.value) {
        tmpEventDate.value = (GetAllEvents[EventID.value].Date + " " + GetAllEvents[EventID.value].Time).split("/").join("-")
        console.log(tmpEventDate.value)
        console.log("Evented");
        tmpEventName.value = EventID.value.split("_").join(" ")
        special.value = GetAllEvents[EventID.value].IsSpecial
      }

    })
    let tmpcourses = $store.getters["stores/courses"]
    watch(model, () => {
      console.log("Watched", model.value)
      console.log(tmpcourses[model.value])
      if (Editdialog.value) {
        tmpLecturer.value = tmpcourses[model.value].Lecturer;
        tmpCourseName.value = tmpcourses[model.value].CourseName;
        tmplink.value = tmpcourses[model.value].link;
        tmpDay.value = tmpcourses[model.value].Day;
        tmpStartTime.value = tmpcourses[model.value].StartTime;
        tmpEndTime.value = tmpcourses[model.value].EndTime;
        tmpRecurringlink.value = tmpcourses[model.value].Recurringlink;
      }
      else {
        console.log("not Edited!")
      }
    })
    return {
      EventID,
      tmpcourse,
      Days,
      Time,
      tmpcoursetype,
      newcourse,
      newcoursetype,
      edited,
      tmpLecturer,
      tmpCourseName,
      tmpDay,
      tmpStartTime,
      tmpEndTime,
      tmpRecurringlink,
      tmpCoursename,
      tmplink,
      tab: ref("Lectures"),
      splitterModel: ref(20),
      text: ref(''),
      ph: ref(''),
      special,
      tmpEventDate,
      tmpEventName,
      Addevent: ref(false),
      Editevent,
      Removeevent: ref(false),
      alert: ref(false),
      confirm: ref(false),
      prompt: ref(false),
      Adddialog: ref(false),
      Editdialog,
      eventconfirm: ref(false),
      Deletedialog: ref(false),
      maximizedToggle: ref(false),
      model,
      dense: ref(false),
      q,
      empty: ref(false)
    }
  },
  components: {
    Fileuploader: Fileuploader,
    Notification: Notification,
    UpcomigSubmission:UpcomigSubmission
  },
  mounted() {
    this.getCourses();

    this.GetEvents();
    // this.model= Object.keys(this.courses)[0]
    this.model = this.AllcoursesID[0]
  },
  computed: {
    ...mapGetters('stores', ['courses', 'Tcourses', 'AllcoursesID', 'UserAdmin', 'GetFullname', 'GetSpecialEventsID', 'GetSpecialEvents']),
    GetModifiedTime2() {
      return key => {
        console.log(key);
        let coursemodedTime = this.courses[key].lastmodifiedTime
        let coursemodedDay = this.courses[key].lastmodifiedDate
        let Dates = new Date()
        let tmpDay = ((Dates.getDate() > 9 ? Dates.getDate() : "0" + Dates.getDate()) + "/" + (Dates.getMonth() + 1) + "/" + Dates.getFullYear());

        let tmpTime = (Dates.getHours() > 12 ? Dates.getHours() - 12 : (Dates.getHours() == 0 ? "0" + Dates.getHours() : Dates.getHours())) + ":" + (Dates.getMinutes() >= 10 ? Dates.getMinutes() : "0" + Dates.getMinutes()) + ":" + (Dates.getSeconds() >= 10 ? Dates.getSeconds() : "0" + Dates.getSeconds());
        console.log("tmpDay", tmpDay);
        console.log("tmpTime", tmpTime);
        console.log(coursemodedDay);
        console.log(coursemodedTime)
        if (coursemodedTime.substring(9, 11) == "PM") {
          coursemodedTime = (parseInt(coursemodedTime.substring(0, 2)) + 12) + coursemodedTime.substring(2, 8)
        }
        console.log("updated", coursemodedTime);
        if (tmpDay == coursemodedDay) {
          if (Dates.getHours() == coursemodedTime.split(":")[0]) {
            if (Dates.getMinutes() == coursemodedTime.split(":")[1]) {
              return "Just Now"
            }
            else if (Dates.getMinutes() > parseInt(coursemodedTime.split(":")[1])) {
              return (Dates.getMinutes() - coursemodedTime.split(":")[1]) + " Minutes Ago"
            }
            else {
              return "Just Now"
            }
          }
          else if (Dates.getHours() > coursemodedTime.split(":")[0]) {
            return (Dates.getHours() - coursemodedTime.split(":")[0]) + " aHours Ago"
          }
          else {
            return "Just Now"
          }
        }
        else if (Dates.getMonth() + 1 == coursemodedDay.split("/")[1]) {
          if (Dates.getDate() > coursemodedDay.substring(0, 2)) {
            console.log("nuu", coursemodedDay.substring(0, 2));
            return (Dates.getDate() - parseInt(coursemodedDay.substring(0, 2))) + " Days Ago"
          } else {
            return "Inform Admin"
          }
        }
        else if (Dates.getMonth() + 1 - parseInt(coursemodedDay.split("/")[1]) < 2) {
          let MD = parseInt(((Dates.getMonth() > 6 ? ((Dates.getMonth() % 2 == 0) ? 31 : 30) : ((Dates.getMonth() % 2 == 0) ? 30 : 31))))
          return (Dates.getDate() + MD - parseInt(coursemodedDay.substring(0, 2))) + " Days Ago"
        } else if (Dates.getMonth() + 1 - parseInt(coursemodedDay.split("/")[1]) > 1) {
          return (Dates.getMonth() - parseInt(coursemodedDay.split("/")[1])) + " Months Ago"
        }


        else {
          return "Just Now"
        }

        return "null"
      }
      // let coursemodedTime=this.courses[key].lastmodifiedTime
      // let coursemodedDay=this.courses[key].lastmodifiedDate
      // let tmpDate=new Date()
      // let tmpDay=tmpDate.getDate()
      // let tmpMonth=tmpDate.getMonth()
      // console.log(tmpDay);
      // console.log(tmpMonth);
      // console.log(coursemodedDay);
      // console.log(coursemodedTime)

    },
    GetModifiedTime() {
      return key => {
        let coursemodedTime = this.courses[key].lastmodifiedTime
        coursemodedTime = ((coursemodedTime.split(" ")[1] == 'PM' ? (parseInt(coursemodedTime.split(":")[0]) + 12) : coursemodedTime.split(":")[0]) + ":" + coursemodedTime.split(":")[1] + ":" + coursemodedTime.split(":")[2]).substring(0, 8)
        console.log(coursemodedTime);
        let coursemodedDay = this.courses[key].lastmodifiedDate
        let Dates = new Date()
        let leftdate = new Date(coursemodedDay.split("/")[2], coursemodedDay.split("/")[1] - 1, coursemodedDay.split("/")[0], coursemodedTime.split(":")[0], coursemodedTime.split(":")[1], coursemodedTime.split(":")[2])
        let DifferMin = Math.floor(Math.abs(Dates.getTime() - leftdate.getTime()) / (1000 * 60))
        let DifferHrs = Math.floor(Math.abs(Dates.getTime() - leftdate.getTime()) / (1000 * 60 * 60))
        let DifferDay = Math.floor(Math.abs(Dates.getTime() - leftdate.getTime()) / (1000 * 60 * 60 * 24))
        let Differ;
        if (DifferMin < 60) {
          if (DifferMin <= 1) {
            Differ = "Just Now"
          }
          else if (DifferMin <= 5) {
            Differ = "A Few Minutes ago"
          }
          else {
            Differ = DifferMin + " Minutes Ago"
          }

        }
        else if (DifferHrs < 24) {
          Differ = DifferHrs + " Hours Ago"
        }
        else {
          Differ = DifferDay + " Days Ago"
        }
        return Differ


      }

    },
    CoursesFound: function () {
      if (Object.keys(this.courses).length === 0) {
        console.log("Empty")
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties

        return false
      } else {
        console.log("Not Empty")
        return true
      }
    },
    TodayCourses() {
      if (Object.keys(this.Tcourses).length === 0) {
        console.log("No Today Courses")

        return false
      } else {
        console.log("Today Courses tynw")
        return true
      }
    }
  },
  methods: {
    ...mapActions('stores', ['getCourses', 'Updatecourses', 'RemoveCourse', 'GetEvents', 'AddSpecialEvent', 'Removeanevent']),
    RemoveEvent() {
      console.log("remove Event");
      this.Removeanevent(this.EventID);
      this.eventconfirm = false
      this.Removeevent = false;
      this.q.notify({
        type: 'success',
        icon: 'delete_forever',
        color: 'green-4',
        message: 'Event Removed'
      })

    },
    RemoveEventDialog() {
      this.Removeevent = true
      this.EventID = this.GetSpecialEventsID[0]
    },
    EditEvent() {
      if (this.tmpEventDate != "") {
        const name = this.tmpEventName.split(" ").join("_")
        let Date = this.tmpEventDate.substring(0, this.tmpEventDate.indexOf(" "))
        Date = Date.split("-").join("/")
        const Time = this.tmpEventDate.substring(this.tmpEventDate.indexOf(" ") + 1)+":00"
        console.log(Date, Time, name);
        this.Addevent = false;
        this.AddSpecialEvent({
          name: name,
          date: Date,
          time: Time,
          special: this.special
        })
        this.q.notify({
          type: 'success',
          color: 'green-4',
          icon: 'success',
          message: 'Event Updated Successfully'
        })
        this.tmpEventDate = '',
          this.tmpEventName = ''
        this.Editevent = false;
      }
      else {
        this.q.notify({
          type: 'danger',
          color: 'red-4',
          icon: 'error',
          message: 'Please Enter Date'
        })
      }
    },
    Add_event() {
      console.log("Add Event");

      if (this.tmpEventDate != "") {
        const name = this.tmpEventName.split(" ").join("_")
        let Date = this.tmpEventDate.substring(0, this.tmpEventDate.indexOf(" "))
        Date = Date.split("-").join("/")
        const Time = this.tmpEventDate.substring(this.tmpEventDate.indexOf(" ") + 1) + ":00"
        console.log(Date, Time, name);
        this.Addevent = false;
        this.AddSpecialEvent({
          name: name,
          date: Date,
          time: Time,
          special: this.special
        })
        this.q.notify({
          type: 'success',
          color: 'green-4',
          icon: 'success',
          message: 'Event Added Successfully'
        })
        this.tmpEventDate = '',
          this.tmpEventName = ''
      }
      else {
        this.q.notify({
          type: 'danger',
          color: 'red-4',
          icon: 'error',
          message: 'Please Enter Date'
        })
      }
    },
    EditeventDialog() {
      // this.tmpEventDate=
      this.Editevent = true;
      this.EventID = this.GetSpecialEventsID[0];
      this.tmpEventDate = (this.GetSpecialEvents[this.EventID].Date + " " + this.GetSpecialEvents[this.EventID].Time).split("/").join("-")
      this.tmpEventName = this.EventID.split("_").join(" ")
      this.special = this.GetSpecialEvents[this.EventID].IsSpecial
      // this.tmpEventDate=this.GetEvents[EventID]

    },
    AddCourse() {
      console.log("Added");
      console.log(this.newcourse.substring(0, 7));
      let Coursetype = '';
      let CourseName = this.newcourse.substring(10);
      console.log(CourseName);
      if (this.newcoursetype === 'Live Lectures') {
        Coursetype = 'LS'
      }
      else if (this.newcoursetype === 'Tutorial Session') {
        Coursetype = 'TS'
      }
      else if (this.newcoursetype === 'Practical Session') {
        Coursetype = 'PS'
      }
      let CourseID = this.newcourse.substring(0, 7) + Coursetype;
      this.Updatecourses({
        ID: CourseID,
        CourseName: CourseName,
        Day: this.tmpDay,
        Lecturer: this.tmpLecturer,
        StartTime: this.tmpStartTime,
        EndTime: this.tmpEndTime,
        link: this.tmplink,
        lastmodified: this.GetFullname,
        RecurringMeeting: this.tmpRecurringlink
      })
      this.q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'cloud_done',
        message: 'Course Added!'
      })
      this.Adddialog = false;
      this.ClearAll()

    },
    ClearAll() {
      this.newcourse = ''
      this.newcoursetype = ''
      this.tmpLecturer = ''
      this.tmpDay = ''
      this.tmpStartTime = ''
      this.tmpEndTime = ''
      this.tmpCoursename = ''
      this.tmplink = ''
      this.tmpRecurringlink = false
    },
    UpdateCourse() {
      console.log("Updated");
      this.Updatecourses({
        ID: this.model,
        CourseName: this.tmpCourseName,
        Day: this.tmpDay,
        Lecturer: this.tmpLecturer,
        StartTime: this.tmpStartTime,
        EndTime: this.tmpEndTime,
        link: this.tmplink,
        lastmodified: this.GetFullname,
        RecurringMeeting: this.tmpRecurringlink
      })
      this.ClearAll()
      this.Editdialog = false
      this.q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'update',
        message: 'Course Updated!'
      })
    },
    Editdialogox() {
      this.model = Object.keys(this.courses)[0]
      this.tmpCourseName = this.courses[this.model].CourseName
      this.tmpLecturer = this.courses[this.model].Lecturer
      this.tmplink = this.courses[this.model].link
      this.tmpStartTime = this.courses[this.model].StartTime
      this.tmpEndTime = this.courses[this.model].EndTime
      this.tmpDay = this.courses[this.model].Day
      this.tmpRecurringlink = this.courses[this.model].Recurring

      this.Editdialog = true
    },
    RemoveCourses() {
      this.confirm = false
      let CourseID = this.model.substring(0, 7)
      let Coursetype = this.model.substring(8)
      console.log(CourseID, Coursetype);
      let tag;
      if (Coursetype == "Practical Session") {
        tag = "PS"
      }
      else if (Coursetype == "Tutorial Session") {
        tag = "TS"
      }
      else if (Coursetype == "Live Lectures") {
        tag = "LS"
      }
      let fullCourseID = CourseID + tag

      this.RemoveCourse(fullCourseID)
      this.model = this.AllcoursesID[0]
      this.Deletedialog = false
      this.q.notify({
        color: 'red-4',
        textColor: 'white',
        icon: 'delete_forever',
        message: 'Course Removed!'
      })
    }
  }
};
</script>

<style lang="sass" scoped>

.q-tab-panels
  min-height: 90vh
.my-card
  max-width: 400px
  min-width: 400px
  max-height: 400px
  min-height: 400px
  margin-top: 20px
.my-admin-card
  margin: 50px
  max-width: 400px
  min-width: 400px
  max-height: 500px
  min-height: 500px
.card
  margin-top: 20px
  margin-left: 20px
.mydiv
  margin-top: 20px
  text-align: center
.q-input
  padding: 5px
.space
  height: 50px
.DialogBox
  min-width: 500px
  min-height: 600px
.Addevent
  min-width: 700px
  min-height: 650px
  max-width: 700px
  max-height: 650px
.my-card2
  width: 100%
  max-width: 250px
  min-width: 250px
  max-height: 250px
  min-height: 250px
.delprompt
  max-height: 150px
  min-height: 150px
  max-width: 300px
  min-width: 300px
</style>
