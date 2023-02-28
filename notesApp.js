const addNoteButton=document.getElementsByClassName("button-text")[0]
const heading=document.getElementsByClassName("heading")[0]


const innerhtml=`<div class="operation">
 <button class="edit hidden"> <i class="fas fa-edit"></i> </button>
 <button class="delete hidden"> <i class="fas fa-trash-alt"></i> </button>
<button class="save-btn"> <i class="fas fa-save"></i><span class="save">save</span></button>
</div>

<textarea class="content" placeholder="add notes..."></textarea>`
let maindiv;
const addNote=(element,length)=>{
   maindiv=document.createElement("div")
  maindiv.classList.add("note","unsavedItems")
  maindiv.innerHTML=innerhtml;
  heading.after(maindiv)
  const save=document.getElementsByClassName("save")[0]
  save.addEventListener("click",savedata)
}

 const savedata=()=>{
  let actualdata=JSON.parse(localStorage.getItem("notes"))
  
  const content=document.getElementsByClassName("content")[0].value

  if(actualdata!=null && content!=='')
  {
    let newdata=[...actualdata,{id:Date.now(),data:content}]
 
    localStorage.setItem("notes",JSON.stringify(newdata))
  }
   else if(content!=''){
    localStorage.setItem("notes",JSON.stringify([{id:Date.now(),data:content}]))
   }

  maindiv.classList.add("hidden")
  getdata({id:Date.now(),data:content})
 }

const editNote=(e) => {

  let maindiv=e.target.parentNode.parentNode.parentNode
 let textarea=maindiv.getElementsByClassName("content")[0]
 const save_btn=maindiv.getElementsByClassName("save-btn")[0]
const edit_btn=maindiv.getElementsByClassName("edit")[0]
 save_btn.classList.remove("hidden");
  edit_btn.classList.add("hidden")
  textarea.readOnly=false;
  save_btn.addEventListener("click",()=>{
  let content=textarea.value
  let actualdata=JSON.parse(localStorage.getItem("notes"))
  
  let desiredData=actualdata.find((element)=>{

      return element.id==maindiv.getAttribute("name")
  })

  actualdata=actualdata.filter((element)=>{
        return maindiv.getAttribute("name")!=element.id
  })

  if(content!=='')
  {
    let newdata={id:desiredData.id,data:content}
   localStorage.setItem("notes",JSON.stringify([...actualdata,newdata])) 
  save_btn.classList.add("hidden");
  edit_btn.classList.remove("hidden")
  textarea.readOnly=true;
  }
   
 }
  )
}


const deleteNote=(e)=>{
 let maindiv=e.target.parentNode.parentNode.parentNode
 maindiv.remove()
  const name=maindiv.getAttribute("name")
  let actualdata=JSON.parse(localStorage.getItem("notes"))
  actualdata=actualdata.filter((element)=>{
    console.log("🚀 ~ file: notesApp.js:66 ~ deleteNote ~ name", name)
  console.log("🚀 ~ file: notesApp.js:66 ~ deleteNote ~ ele", element.id)
        return name!=element.id
  })
  console.log("🚀 ~ myline",actualdata)
  localStorage.setItem("notes",JSON.stringify([...actualdata])) 
}



const getdata=(element) => {
  const maindiv=document.createElement("div")
  maindiv.classList.add("note","savedItems")
  maindiv.innerHTML=innerhtml;
  maindiv.setAttribute("name",element.id)
const save_btn=maindiv.getElementsByClassName("save-btn")[0]
const edit_btn=maindiv.getElementsByClassName("edit")[0]
const delete_btn=maindiv.getElementsByClassName("delete")[0]
const content= maindiv.getElementsByClassName("content")[0]
 content.textContent=element.data
  heading.after(maindiv)
  save_btn.classList.add("hidden");
  delete_btn.classList.remove("hidden")
  edit_btn.classList.remove("hidden")
  content.readOnly=true; 
  delete_btn.addEventListener("click",(e)=>deleteNote(e));
  edit_btn.addEventListener("click",(e)=>editNote(e))
}

const getdatafromstorage=()=>{
 
  const actualdata=JSON.parse(localStorage.getItem("notes"))
  if(actualdata!==null)
  {
    actualdata.map((element)=>{
      getdata(element)
    })
  }
 
}


addNoteButton.addEventListener("click",addNote);
window.addEventListener("load",  getdatafromstorage);






























