import"./assets/modulepreload-polyfill-3cfb730f.js";import{f as h,i as p}from"./assets/vendor-77e16229.js";const l=document.querySelector("input"),t=document.querySelector("button");t.disabled=!0;t.addEventListener("click",C);const y=document.querySelector("[data-days]"),g=document.querySelector("[data-hours]"),S=document.querySelector("[data-minutes]"),b=document.querySelector("[data-seconds]");let m;const u=e=>{const n=Date.now();return m-n};function c(e){return String(e).padStart(2,"0")}function C(){const e=setInterval(()=>{const o=u(),a=v(o),{days:r,hours:s,minutes:i,seconds:d}=a;y.textContent=c(r),g.textContent=c(s),S.textContent=c(i),b.textContent=c(d)},1e3),n=u();setTimeout(()=>{clearInterval(e),l.disabled=!1,t.disabled=!1},n),l.disabled=!0,t.disabled=!0}h("#datetime-picker",{enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(e){m=e[0].getTime();const o=u();(r=>new Promise((s,i)=>{r<0?i(p.error({message:"Please choose a date in the future",messageColor:"#fff",messageSize:"16px",messageLineHeight:"1,5",backgroundColor:"#EF4040",position:"topRight",progressBarColor:"#B51B1B",theme:"dark",iconUrl:"../img/error.svg"})):s()}))(o).then(()=>{t.disabled=!1}).catch(r=>{t.disabled=!0})}});function v(e){const s=Math.floor(e/864e5),i=Math.floor(e%864e5/36e5),d=Math.floor(e%864e5%36e5/6e4),f=Math.floor(e%864e5%36e5%6e4/1e3);return{days:s,hours:i,minutes:d,seconds:f}}
//# sourceMappingURL=commonHelpers.js.map
