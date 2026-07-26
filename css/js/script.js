/* ===================================
   AgroSense Main JavaScript
=================================== */

// Welcome Message
window.addEventListener("load", () => {
    console.log("🌱 AgroSense Loaded Successfully");
});

// ================================
// Active Navigation Highlight
// ================================

const currentPage = window.location.pathname.split("/").pop();

document.querySelectorAll(".sidebar a").forEach(link => {

    const href = link.getAttribute("href");

    if (href === currentPage) {
        link.classList.add("active");
    }

});

// ================================
// Smooth Scroll
// ================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function(e){

        e.preventDefault();

        document.querySelector(this.getAttribute("href"))
        ?.scrollIntoView({
            behavior:"smooth"
        });

    });

});

// ================================
// Scroll To Top Button
// ================================

const topButton = document.createElement("button");

topButton.innerHTML = "⬆";

topButton.id = "topButton";

document.body.appendChild(topButton);

Object.assign(topButton.style,{

position:"fixed",
bottom:"25px",
right:"25px",
width:"50px",
height:"50px",
borderRadius:"50%",
background:"#00c853",
color:"#fff",
border:"none",
fontSize:"20px",
cursor:"pointer",
display:"none",
zIndex:"9999"

});

window.addEventListener("scroll",()=>{

if(window.scrollY>300){

topButton.style.display="block";

}else{

topButton.style.display="none";

}

});

topButton.onclick=()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

};

// ================================
// Card Hover Animation
// ================================

document.querySelectorAll(".card,.crop-card,.recommend-card")
.forEach(card=>{

card.addEventListener("mouseenter",()=>{

card.style.transform="translateY(-8px)";

});

card.addEventListener("mouseleave",()=>{

card.style.transform="translateY(0px)";

});

});

// ================================
// Image Preview
// ================================

const upload=document.getElementById("imageUpload");

const preview=document.getElementById("preview");

if(upload && preview){

upload.addEventListener("change",function(){

const file=this.files[0];

if(file){

preview.src=URL.createObjectURL(file);

}

});

}

// ================================
// Simple Notification
// ================================

function showNotification(message){

const note=document.createElement("div");

note.innerText=message;

Object.assign(note.style,{

position:"fixed",
top:"20px",
right:"20px",
background:"#00c853",
padding:"15px 25px",
borderRadius:"10px",
color:"#fff",
fontWeight:"600",
zIndex:"9999"

});

document.body.appendChild(note);

setTimeout(()=>{

note.remove();

},3000);

}

// ================================
// Contact Form
// ================================

const contactForm=document.querySelector("form");

if(contactForm){

contactForm.addEventListener("submit",function(e){

e.preventDefault();

showNotification("Message Sent Successfully!");

contactForm.reset();

});

}

// ================================
// Dashboard Counter Animation
// ================================

document.querySelectorAll(".counter").forEach(counter=>{

const target=Number(counter.dataset.target)||0;

let count=0;

const speed=target/100;

const update=()=>{

count+=speed;

if(count<target){

counter.innerText=Math.floor(count);

requestAnimationFrame(update);

}else{

counter.innerText=target;

}

};

update();

});
