/*
FROGINAL DOGS PARTY LOBBY
Demo mode works immediately in one browser.
For shared live attendees/reactions, configure Supabase URL/key and implement a public-safe table + Realtime policies.
Never put a Supabase service_role key in client-side code.
Add a licensed/owned audio URL to PARTY_AUDIO_URL.
*/
const SUPABASE_URL = "";
const SUPABASE_ANON_KEY = "";
const PARTY_AUDIO_URL = "";
const $ = s => document.querySelector(s);
const state = {nickname:"",avatar:"🐸",joined:false,attendees:[],feed:[]};
let toastTimer;
const audio = $("#audio");
function toast(msg){const el=$("#toast");el.textContent=msg;el.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove("show"),2200)}
function esc(v){return String(v).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function renderAttendees(){ $("#attendeeCount").textContent=state.attendees.length+" HERE";$("#attendees").innerHTML=state.attendees.length?state.attendees.map((p,i)=>'<div class="person"><div class="face">'+esc(p.avatar)+'</div><div style="min-width:0"><div class="nick">'+esc(p.nickname)+'</div><div class="tag">'+(p.me?"YOU ARE IN":"IN THE PARTY")+'</div></div></div>').join(""):'<div class="empty">Nobody here yet. Be the first Froginal!</div>'}
function renderFeed(){ $("#feedCount").textContent=state.feed.length+" REACTIONS";$("#feed").innerHTML=state.feed.length?state.feed.slice(0,12).map(p=>'<div class="item"><span class="emoji">'+esc(p.emoji)+'</span><span><strong>'+esc(p.nickname)+'</strong> dropped <strong>'+esc(p.label)+'</strong></span></div>').join(""):'<div class="empty">The swamp is quiet… send the first reaction!</div>'}
document.querySelectorAll(".avatar").forEach(b=>b.addEventListener("click",()=>{state.avatar=b.dataset.avatar;document.querySelectorAll(".avatar").forEach(a=>a.setAttribute("aria-pressed",String(a===b)))}));
$("#focusJoin").addEventListener("click",()=>{$("#nickname").focus();$("#joinPanel").scrollIntoView({behavior:"smooth",block:"center"})});
$("#joinForm").addEventListener("submit",e=>{e.preventDefault();const nickname=$("#nickname").value.trim().replace(/\s+/g," ").slice(0,20);if(!nickname)return toast("Add a nickname to enter!");state.nickname=nickname;if(!state.joined){state.joined=true;state.attendees.unshift({nickname,avatar:state.avatar,me:true});toast("WELCOME TO THE SWAMP, "+nickname.toUpperCase()+"!")}else{const me=state.attendees.find(p=>p.me);if(me){me.nickname=nickname;me.avatar=state.avatar}toast("Party profile updated!")}$("#joinButton").textContent="UPDATE";renderAttendees()});
$("#memes").addEventListener("click",e=>{const b=e.target.closest("button[data-emoji]");if(!b)return;if(!state.joined)return toast("Enter a nickname first to send reactions!");state.feed.unshift({emoji:b.dataset.emoji,label:b.dataset.label,nickname:state.nickname});renderFeed();toast(b.dataset.emoji+" "+b.dataset.label+"!")});
$("#play").addEventListener("click",async()=>{if(!audio.src){if(!PARTY_AUDIO_URL)return toast("Add your audio URL in app.js first.");audio.src=PARTY_AUDIO_URL}try{if(audio.paused){await audio.play();$("#play").textContent="Ⅱ";$("#play").setAttribute("aria-label","Pause party music");$("#musicStatus").textContent="NOW PLAYING"}else{audio.pause();$("#play").textContent="▶";$("#play").setAttribute("aria-label","Play party music");$("#musicStatus").textContent="PAUSED"}}catch(e){toast("Could not play audio. Check the URL.")}});
$("#volume").addEventListener("input",e=>audio.volume=Number(e.target.value));audio.volume=Number($("#volume").value);
audio.addEventListener("timeupdate",()=>{if(audio.duration)$("#progress").style.width=(audio.currentTime/audio.duration*100)+"%"});
renderAttendees();renderFeed();
if(SUPABASE_URL&&SUPABASE_ANON_KEY)console.info("Supabase values present; realtime schema/subscriptions still need to be implemented.");
