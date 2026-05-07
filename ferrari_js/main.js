/* ===== STARS ===== */
function initStars(){
  const canvas=document.getElementById('intro-stars');
  const ctx=canvas.getContext('2d');
  function resize(){canvas.width=window.innerWidth;canvas.height=window.innerHeight;}
  resize();
  const cx=()=>canvas.width/2,cy=()=>canvas.height/2;
  const stars=Array.from({length:70},()=>({
    x:Math.random()*(canvas.width*.3),
    y:cy()+(Math.random()-.5)*canvas.height*.7,
    tx:cx()+(Math.random()-.5)*80,ty:cy()+(Math.random()-.5)*80,
    size:Math.random()*1.8+.4,speed:Math.random()*.022+.010,
    alpha:Math.random()*.6+.4,t:Math.random(),delay:Math.random()*.5
  }));
  let running=true;
  function easeOut(t){return 1-Math.pow(1-t,2.5);}
  function draw(){
    if(!running)return;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    stars.forEach(s=>{
      if(s.t<s.delay){s.t+=s.speed*.3;return;}
      s.t=Math.min(s.t+s.speed,1);
      const prog=s.t,px=s.x+(s.tx-s.x)*easeOut(prog),py=s.y+(s.ty-s.y)*easeOut(prog);
      const pulse=Math.sin(prog*Math.PI),a=s.alpha*pulse;
      ctx.save();ctx.globalAlpha=Math.max(0,a);
      const grd=ctx.createRadialGradient(px,py,0,px,py,s.size*4);
      grd.addColorStop(0,'rgba(255,255,255,1)');grd.addColorStop(.3,'rgba(220,220,255,0.7)');grd.addColorStop(1,'rgba(180,180,255,0)');
      ctx.fillStyle=grd;ctx.beginPath();ctx.arc(px,py,s.size*4,0,Math.PI*2);ctx.fill();
      ctx.fillStyle='rgba(255,255,255,'+Math.min(1,a*1.5)+')';
      ctx.beginPath();ctx.arc(px,py,s.size*.7,0,Math.PI*2);ctx.fill();
      ctx.restore();
    });
    if(stars.every(s=>s.t>=1)){running=false;ctx.clearRect(0,0,canvas.width,canvas.height);return;}
    requestAnimationFrame(draw);
  }
  draw();
  window.addEventListener('resize',resize);
}

/* ===== PARTICLES (SECTION 2) ===== */
function initModelsParticles(){
  const canvas=document.getElementById('models-particles');
  if(!canvas)return;
  const section=document.getElementById('section-models');
  const ctx=canvas.getContext('2d');
  let W,H,particles=[],raf;
  function resize(){W=canvas.width=section.offsetWidth;H=canvas.height=section.offsetHeight;}
  resize();
  window.addEventListener('resize',resize);
  function rnd(a,b){return a+Math.random()*(b-a);}
  function spawn(){
    const side=Math.random()<0.5?'left':'right';
    return{x:side==='left'?rnd(0,W*0.35):rnd(W*0.65,W),y:rnd(H*0.12,H*0.90),vx:rnd(-0.2,0.2),vy:rnd(-0.6,-0.15),life:0,maxLife:rnd(180,360),size:rnd(1.1,2.2)};
  }
  particles=[];
  for(let i=0;i<105;i++){const p=spawn();p.life=Math.random()*p.maxLife;particles.push(p);}
  function tick(){
    ctx.clearRect(0,0,W,H);
    particles.forEach((p,i)=>{
      p.life++;p.x+=p.vx;p.y+=p.vy;
      if(p.life>p.maxLife){particles[i]=spawn();}
      const t=p.life/p.maxLife;
      const alpha=Math.sin(t*Math.PI)*0.62;
      ctx.save();ctx.globalAlpha=alpha;
      const isBig=p.size>1.7;
      const grd=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,isBig?p.size*3.8:p.size*3.1);
      grd.addColorStop(0,'rgba(170,22,34,0.95)');grd.addColorStop(0.45,'rgba(170,22,34,0.34)');grd.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=grd;ctx.beginPath();ctx.arc(p.x,p.y,p.size*2.5,0,Math.PI*2);ctx.fill();
      ctx.restore();
    });
    raf=requestAnimationFrame(tick);
  }
  const observer=new IntersectionObserver(entries=>{
    if(entries[0].isIntersecting){tick();}else{cancelAnimationFrame(raf);}
  },{threshold:0.1});
  observer.observe(section);
}

/* ===== MENU ===== */
const menuPanel=document.getElementById('menuPanel');
const navOverlay=document.getElementById('navOverlay');
const hamburger=document.getElementById('hamburger');
const closeBtn=document.getElementById('closeBtn');
const mobileBackBtn=document.getElementById('megaMobileBack');
const primaryMenuLinks=Array.from(document.querySelectorAll('.mega-primary-link'));
const menuSubpanels=Array.from(document.querySelectorAll('.mega-subpanel'));
const previewItems=Array.from(document.querySelectorAll('.mega-vehicle-item, .mega-collection-item, .mega-collection-child, .mega-editorial-card'));
const collectionGroups=Array.from(document.querySelectorAll('.mega-collection-group'));
const collectionParents=Array.from(document.querySelectorAll('.mega-collection-item'));
const previewLabel=document.getElementById('megaPreviewLabel');
const previewTitle=document.getElementById('megaPreviewTitle');
const previewDesc=document.getElementById('megaPreviewDesc');
const previewImage=document.getElementById('megaPreviewImage');
const previewBtn=document.getElementById('megaPreviewBtn');

const mobileMenuQuery=window.matchMedia('(max-width: 768px)');

const rangePreviewAdjustment={width:'min(100%,770px)',x:'-72px',y:'86px',scale:'.84'};
const specialSeriesPreviewAdjustment={x:'14px',y:'22px',scale:'1.08'};
const iconaPreviewAdjustment={x:'-92px',y:'-86px',scale:'.82'};
const supercarsPreviewAdjustment={x:'-132px',y:'-48px',scale:'.68'};
const gtRacingPreviewAdjustment={x:'-122px',y:'-18px',scale:'.68'};
const yourFerrariStandardPreviewAdjustment={x:'-28px',y:'92px',scale:'1'};
const selectModelPreviewAdjustment={width:'min(100%,760px)',x:'-58px',y:'48px',scale:'.92'};
const selectModelHeroPreviewAdjustment={width:'min(100%,760px)',x:'-58px',y:'48px',scale:'.92'};
const financialSmartPreviewAdjustment={x:'-28px',y:'72px',scale:'1'};
const preOwnedPreviewAdjustment={x:'-36px',y:'84px',scale:'1'};

const previewImageAdjustments={
  'RANGE':rangePreviewAdjustment,
  'FERRARI LUCE':rangePreviewAdjustment,
  '849 TESTAROSSA':{x:'-68px',y:'-76px',scale:'.88'},
  '849 TESTAROSSA SPIDER':{y:'24px',scale:'1.08'},
  '296 GTB':{scale:'1.08'},
  '296 GTS':{scale:'1.08'},
  'FERRARI 12CILINDRI':{y:'28px',scale:'1.08'},
  'FERRARI 12CILINDRI SPIDER':{y:'28px',scale:'1.08'},
  'FERRARI PUROSANGUE':{y:'28px',scale:'1.08'},
  'FERRARI AMALFI':{y:'28px',scale:'1.08'},
  'FERRARI AMALFI SPIDER':{y:'28px',scale:'1.08'},
  'SPECIAL SERIES':specialSeriesPreviewAdjustment,
  '296 SPECIALE':specialSeriesPreviewAdjustment,
  'ICONA':iconaPreviewAdjustment,
  'DAYTONA SP3':iconaPreviewAdjustment,
  'MONZA SP1':{x:'-94px',y:'-86px',scale:'.82'},
  'MONZA SP2':{x:'-94px',y:'-86px',scale:'.82'},
  'SUPERCARS':supercarsPreviewAdjustment,
  'F80':supercarsPreviewAdjustment,
  'LAFERRARI APERTA':{x:'-78px',y:'-62px',scale:'.82'},
  'LAFERRARI':{x:'-78px',y:'-92px',scale:'.82'},
  'ENZO FERRARI':{x:'-78px',y:'-62px',scale:'.82'},
  'F50':{x:'-78px',y:'-62px',scale:'.82'},
  'F40':{x:'-78px',y:'-92px',scale:'.82'},
  'GTO':{x:'-78px',y:'-62px',scale:'.82'},
  'GT RACING':gtRacingPreviewAdjustment,
  '296 GT3':gtRacingPreviewAdjustment,
  'PAST MODELS':{width:'min(100%,800px)',x:'-78px',y:'72px',scale:'.76'},
  'CONFIGURE':yourFerrariStandardPreviewAdjustment,
  'NEW CONFIGURATION':yourFerrariStandardPreviewAdjustment,
  'RETRIEVE FROM MYFERRARI':yourFerrariStandardPreviewAdjustment,
  'RETRIEVE WITH CODE':yourFerrariStandardPreviewAdjustment,
  'TAILOR MADE':{x:'-24px',y:'88px',scale:'1'},
  'FERRARI GENUINE':{x:'-176px',y:'96px',scale:'.72'},
  'CAR SERVICES':{x:'-176px',y:'96px',scale:'.72'},
  'FINANCIAL SERVICES':financialSmartPreviewAdjustment,
  'SMART GUIDES':{x:'-28px',y:'48px',scale:'1'},
  'OWNERS':{x:'-24px',y:'52px',scale:'1'},
  'ON ROAD EXPERIENCES':{x:'-24px',y:'52px',scale:'1'},
  'CORSE CLIENTI':{x:'-24px',y:'52px',scale:'1'},
  'CORSO PILOTA':{x:'-24px',y:'52px',scale:'1'},
  'OWNERS CLUB':{x:'-24px',y:'52px',scale:'1'},
  'MY FERRARI':{x:'-24px',y:'52px',scale:'1'},
  'MYFERRARI APP':{x:'-24px',y:'52px',scale:'1'},
  'MYFERRARI CONNECT':{x:'-24px',y:'52px',scale:'1'},
  'MYSTORE':{x:'-28px',y:'78px',scale:'1'},
  'SELECT MODEL':selectModelHeroPreviewAdjustment,
  'SELECT MODEL:FERRARI 12CILINDRI':selectModelHeroPreviewAdjustment,
  'SELECT MODEL:FERRARI 12CILINDRI SPIDER':selectModelPreviewAdjustment,
  'SELECT MODEL:FERRARI PUROSANGUE':{width:'min(100%,800px)',x:'18px',y:'48px',scale:'1'},
  'SELECT MODEL:296 GTB':{width:'min(100%,760px)',x:'-58px',y:'8px',scale:'.92'},
  'SELECT MODEL:296 GTS':{width:'min(100%,760px)',x:'-58px',y:'8px',scale:'.92'},
  'SELECT MODEL:SF90 SPIDER':{width:'min(100%,760px)',x:'-58px',y:'8px',scale:'.92'},
  'SELECT MODEL:FERRARI ROMA SPIDER':{width:'min(100%,800px)',x:'18px',y:'48px',scale:'1'},
  'SELECT MODEL:FERRARI DAYTONA SP3':{width:'min(100%,720px)',x:'-78px',y:'-40px',scale:'.78'},
  'FERRARI CLASSICHE':{x:'-36px',y:'118px',scale:'1'},
  'PRE-OWNED':preOwnedPreviewAdjustment,
  'HOME':preOwnedPreviewAdjustment,
  'WHY APPROVED':preOwnedPreviewAdjustment,
  'MODELS':preOwnedPreviewAdjustment,
  'VALUE YOUR CAR':preOwnedPreviewAdjustment,
  'DEALERS':{x:'-36px',y:'82px',scale:'1'},
  'FIND YOUR DEALER':{x:'-36px',y:'82px',scale:'1'},
  'DISCOVER THE OFFICIAL NETWORK':{x:'-36px',y:'82px',scale:'1'}
};

const mobileLargePreviewTitles=new Set([
  '849 TESTAROSSA',
  '849 TESTAROSSA SPIDER',
  '296 GTB',
  '296 GTS',
  'FERRARI 12CILINDRI',
  'FERRARI 12CILINDRI SPIDER',
  'FERRARI PUROSANGUE',
  'FERRARI AMALFI',
  'FERRARI AMALFI SPIDER',
  '296 SPECIALE',
  '296 SPECIALE A',
  'SF90 XX STRADALE',
  'SF90 XX SPIDER',
  '812 COMPETIZIONE',
  '812 COMPETIZIONE A'
]);

const mobileSmallPreviewTitles=new Set([
  'GT RACING',
  '296 GT3',
  'SUPERCARS',
  'F80'
]);

const mobileFeaturePreviewKeys=new Set([
  'SELECT MODEL:FERRARI ROMA SPIDER',
  'SELECT MODEL:FERRARI PUROSANGUE'
]);

document.querySelectorAll('[data-preview-image]').forEach(item=>{
  item.style.setProperty('--mobile-item-image',`url("${item.dataset.previewImage}")`);
});

function applyPreviewImageAdjustment(title,label){
  if(!previewImage)return;
  const adjustment=previewImageAdjustments[`${label}:${title}`]||previewImageAdjustments[title]||{};
  previewImage.style.setProperty('--preview-width',adjustment.width||'min(100%,720px)');
  previewImage.style.setProperty('--preview-x',adjustment.x||'0px');
  previewImage.style.setProperty('--preview-y',adjustment.y||'0px');
  previewImage.style.setProperty('--preview-scale',adjustment.scale||'1');
}

function renderPreviewTitle(title,displayTitle){
  if(!previewTitle)return;
  const nextTitle=title||'FERRARI LUCE';
  previewTitle.dataset.previewTitle=nextTitle;
  const titleLines=displayTitle?displayTitle.split('|'):null;
  if(titleLines&&titleLines.length>1){
    previewTitle.replaceChildren(...titleLines.flatMap((line,index)=>{
      const nodes=[];
      if(index>0)nodes.push(document.createElement('br'));
      const lineNode=document.createElement('span');
      lineNode.className='preview-title-line';
      lineNode.textContent=line;
      nodes.push(lineNode);
      return nodes;
    }));
    return;
  }
  previewTitle.textContent=nextTitle;
}

function setPreview(item){
  if(!item||!previewImage)return;
  const {previewLabel:label,previewTitle:title,previewDisplayTitle:displayTitle,previewDesc:desc,previewImage:image}=item.dataset;
  const nextImage=image||previewImage.src;
  const isSameImage=previewImage.getAttribute('src')===nextImage;
  previewImage.classList.add('is-swapping');
  window.setTimeout(()=>{
    previewLabel.textContent=label||'LINEUP';
    renderPreviewTitle(title,displayTitle);
    previewDesc.textContent=desc||'';
    previewImage.src=nextImage;
    previewImage.alt=title||'Ferrari menu preview';
    previewImage.dataset.previewTitle=title||'';
    const previewKey=`${label}:${title}`;
    previewImage.dataset.mobileSize=mobileSmallPreviewTitles.has(title)
      ?'small'
      :mobileFeaturePreviewKeys.has(previewKey)
        ?'feature'
        :mobileLargePreviewTitles.has(title)||label==='SPECIAL SERIES'?'large':'default';
    applyPreviewImageAdjustment(title,label);
    if(previewBtn){
      previewBtn.setAttribute('aria-label',`${title||'Ferrari'} details`);
    }
    previewImage.classList.remove('is-swapping');
  },isSameImage?0:120);
}

function setActivePreviewItem(item){
  const currentPanel=item?.closest('.mega-subpanel');
  if(!currentPanel)return;
  currentPanel.querySelectorAll('.mega-vehicle-item, .mega-collection-item, .mega-collection-child, .mega-editorial-card').forEach(node=>{
    node.classList.toggle('is-active',node===item);
  });
  if(item.classList.contains('mega-collection-child')){
    const parent=item.closest('.mega-collection-group')?.querySelector('.mega-collection-item');
    parent?.classList.add('is-active');
  }
  setPreview(item);
}

function openCollectionGroup(group){
  const panel=group.closest('.mega-subpanel');
  panel?.querySelectorAll('.mega-collection-group').forEach(node=>{
    node.classList.toggle('is-open',node===group);
  });
}

function activatePanel(target){
  const nextPanel=menuPanel.querySelector(`.mega-subpanel[data-menu-panel="${target}"]`);
  if(!nextPanel)return;
  primaryMenuLinks.forEach(link=>{
    const isActive=link.dataset.menuTarget===target;
    link.classList.toggle('is-active',isActive);
    link.setAttribute('aria-pressed',String(isActive));
  });
  menuSubpanels.forEach(panel=>panel.classList.toggle('is-active',panel===nextPanel));
  const firstPreviewItem=
    nextPanel.querySelector('.mega-collection-group.is-open .mega-collection-item') ||
    nextPanel.querySelector('.mega-vehicle-item, .mega-collection-item, .mega-editorial-card');
  if(firstPreviewItem){setActivePreviewItem(firstPreviewItem);}
  if(mobileMenuQuery.matches&&menuPanel.classList.contains('open')){
    menuPanel.classList.add('mobile-drilldown');
  }
}

function openMenu(){
  menuPanel.classList.remove('is-closing');
  menuPanel.classList.add('open');navOverlay.classList.add('open');
  menuPanel.classList.remove('mobile-drilldown');
  menuPanel.setAttribute('aria-hidden','false');
  hamburger.style.opacity='0';hamburger.style.pointerEvents='none';
  setTimeout(()=>closeBtn.classList.add('visible'),180);
}
function closeMenu(){
  if(menuPanel.classList.contains('is-closing'))return;
  menuPanel.classList.add('is-closing');
  navOverlay.classList.remove('open');
  menuPanel.setAttribute('aria-hidden','true');
  closeBtn.classList.remove('visible');
  setTimeout(()=>{
    menuPanel.classList.remove('open','is-closing','mobile-drilldown');
    hamburger.style.opacity='1';hamburger.style.pointerEvents='all';
  },960);
}
hamburger.addEventListener('click',openMenu);
closeBtn.addEventListener('click',closeMenu);
navOverlay.addEventListener('click',closeMenu);
mobileBackBtn?.addEventListener('click',()=>menuPanel.classList.remove('mobile-drilldown'));
mobileMenuQuery.addEventListener('change',event=>{
  if(!event.matches){
    menuPanel.classList.remove('mobile-drilldown');
  }
});
primaryMenuLinks.forEach(link=>{
  link.addEventListener('click',()=>activatePanel(link.dataset.menuTarget));
});
previewItems.forEach(item=>{
  item.addEventListener('mouseenter',()=>setActivePreviewItem(item));
  item.addEventListener('focus',()=>setActivePreviewItem(item));
  item.addEventListener('click',()=>setActivePreviewItem(item));
});
collectionParents.forEach(item=>{
  item.addEventListener('click',()=>{
    const group=item.closest('.mega-collection-group');
    const firstChild=group?.querySelector('.mega-collection-child');
    if(group&&firstChild){
      openCollectionGroup(group);
      setActivePreviewItem(firstChild);
    }else{
      setActivePreviewItem(item);
    }
  });
});
document.addEventListener('keydown',(event)=>{
  if(event.key==='Escape'&&menuPanel.classList.contains('open')){closeMenu();}
});
activatePanel('all-models');
/* ===== LANGUAGE ===== */
document.querySelectorAll('.lang-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.lang-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
  });
});

/* ===== HERO CAR SEQUENCE ===== */
let heroCarTimers=[];
let introTextPlayed=false;

function clearHeroCarTimers(){
  heroCarTimers.forEach(timer=>clearTimeout(timer));
  heroCarTimers=[];
}

function runCarSequence(){
  const carEnter=document.querySelector('.car-enter');
  const carStop=document.querySelector('.car-stop');
  const carLight=document.querySelector('.car-light');
  const heroSection=document.getElementById('heroSection');

  if(!carEnter||!carStop||!carLight){
    console.error('차량 요소를 찾을 수 없습니다.');
    return;
  }

  clearHeroCarTimers();

  carEnter.classList.remove('is-entering');
  carStop.classList.remove('is-visible');
  carStop.classList.remove('hero-static-visible');
  carLight.classList.remove('is-visible');
  carLight.classList.remove('headlight-only');
  heroSection?.classList.remove('hero-dimmed');

  carEnter.style.opacity='0';
  carStop.style.opacity='0';
  carLight.style.opacity='0';

  void carEnter.offsetWidth;
  void carStop.offsetWidth;
  void carLight.offsetWidth;

  heroCarTimers.push(setTimeout(()=>{
    carEnter.classList.add('is-entering');
  },120));

  heroCarTimers.push(setTimeout(()=>{
    carEnter.classList.remove('is-entering');
    carEnter.style.opacity='0';
    carStop.classList.add('is-visible');
  },2760));

  heroCarTimers.push(setTimeout(()=>{
    heroSection?.classList.add('hero-dimmed');
  },2980));

  heroCarTimers.push(setTimeout(()=>{
    carLight.style.opacity='0';
    carLight.classList.add('is-visible');
  },3920));
}

function runHeroHeadlightOnly(){
  const carEnter=document.querySelector('.car-enter');
  const carStop=document.querySelector('.car-stop');
  const carLight=document.querySelector('.car-light');
  const heroSection=document.getElementById('heroSection');
  if(!carStop||!carLight)return;

  clearHeroCarTimers();
  carEnter?.classList.remove('is-entering');
  carStop.classList.remove('is-visible');
  carStop.classList.remove('hero-static-visible');
  carLight.classList.remove('is-visible');
  carLight.classList.remove('headlight-only');
  heroSection?.classList.remove('hero-dimmed');
  if(carEnter){
    carEnter.style.opacity='0';
  }
  carStop.style.opacity='1';
  carLight.style.opacity='0';
  void carEnter?.offsetWidth;
  void carStop.offsetWidth;
  void carLight.offsetWidth;

  carStop.classList.add('hero-static-visible');
  carStop.style.transform='translate3d(0,0,0) scale(1)';

  heroCarTimers.push(setTimeout(()=>{
    carLight.style.opacity='0';
    carLight.classList.add('headlight-only');
    carLight.classList.add('is-visible');
  },920));
}

function showHeroFinalState(){
  const carEnter=document.querySelector('.car-enter');
  const carStop=document.querySelector('.car-stop');
  const carLight=document.querySelector('.car-light');
  const heroSection=document.getElementById('heroSection');
  if(!carStop||!carLight)return;

  clearHeroCarTimers();
  carEnter?.classList.remove('is-entering');
  carStop.classList.remove('is-visible');
  carStop.classList.add('hero-static-visible');
  carLight.classList.remove('headlight-only');
  carLight.classList.add('is-visible');
  heroSection?.classList.add('hero-dimmed');

  if(carEnter){
    carEnter.style.opacity='0';
  }
  carStop.style.opacity='1';
  carStop.style.transform='translate3d(0,0,0) scale(1)';
  carLight.style.opacity='';
}

function replayCarSequenceQuick(){
  showHeroFinalState();
}

/* ===== INTRO ===== */
function runIntro(){
  const overlay=document.getElementById('intro-overlay');
  const logo=document.getElementById('intro-logo');
  const glowRing=document.getElementById('intro-glow-ring');
  const bgGlow=document.querySelector('.intro-bg-glow');
  const lightCore=document.querySelector('.intro-light-core');
  const mainLogo=document.getElementById('mainLogo');
  const heroBorderLine=document.getElementById('heroBorderLine');
  const fpDots=document.getElementById('fpDots');
  const slideIds=['si0','si1','si2','si3','si4'];
  introTextPlayed=false;
  document.body.classList.remove('intro-complete');
  document.body.classList.add('intro-running');
  fpDots?.classList.remove('dots-show');
  initStars();
  setTimeout(()=>bgGlow.classList.add('show'),220);
  setTimeout(()=>lightCore?.classList.add('show'),380);
  setTimeout(()=>logo.classList.add('step-slide'),760);
  setTimeout(()=>{
    logo.classList.remove('step-slide');
    glowRing.classList.add('glow');
    logo.animate([
      {opacity:1,transform:'translate3d(-50%,-50%,0) scale(1.16)',filter:'blur(0px)'},
      {opacity:1,transform:'translate3d(-50%,-120px,0) scale(1.05)',filter:'blur(0px)',offset:.42},
      {opacity:.82,transform:'translate3d(-50%,-258px,0) scale(.94)',filter:'blur(2px)',offset:.78},
      {opacity:0,transform:'translate3d(-50%,-392px,0) scale(.82)',filter:'blur(8px)'}
    ],{duration:1120,easing:'cubic-bezier(0.22,1,0.36,1)',fill:'forwards'});
  },1860);
  setTimeout(()=>{
    mainLogo.classList.remove('intro-hidden');
    mainLogo.classList.add('logo-show','logo-settle-glow');
    setTimeout(()=>mainLogo.classList.remove('logo-settle-glow'),860);
  },2440);
  setTimeout(()=>{overlay.classList.add('fade-out');setTimeout(()=>overlay.style.display='none',820);},2640);
  setTimeout(()=>heroBorderLine?.classList.add('line-show'),3180);
  setTimeout(()=>runCarSequence(),4140);
  slideIds.forEach((id,i)=>{setTimeout(()=>{const el=document.getElementById(id);if(el)el.classList.add('in');},8260+i*180);});
  setTimeout(()=>{
    introTextPlayed=true;
    document.body.classList.remove('intro-running');
    document.body.classList.add('intro-complete');
    fpDots?.classList.add('dots-show');
  },8900);
}

/* ===== HEADER SHOW/HIDE ===== */
(function(){
  const topNav=document.getElementById('topNav');
  const mainScroll=document.getElementById('main-scroll');
  let lastScrollTop=0;
  function handleScroll(){
    const current=mainScroll.scrollTop;
    if(current<=10){topNav.classList.remove('nav-hidden');topNav.classList.add('nav-show');lastScrollTop=current;return;}
    if(current>lastScrollTop){topNav.classList.add('nav-hidden');topNav.classList.remove('nav-show');}
    else{topNav.classList.remove('nav-hidden');topNav.classList.add('nav-show');}
    lastScrollTop=current;
  }
  mainScroll.addEventListener('scroll',handleScroll);
})();

/* ===== SECTION 2 SLIDER ===== */
(function(){
  const sectionModels=document.getElementById('section-models');
  const sliderOuter=document.getElementById('modelsSliderOuter');
  const sliderTrack=document.getElementById('modelsSliderTrack');
  const cards=Array.from(document.querySelectorAll('.models-card'));
  const dots=Array.from(document.querySelectorAll('.slider-dot'));
  const prevBtn=document.getElementById('sliderPrev');
  const nextBtn=document.getElementById('sliderNext');
  const currentNum=document.getElementById('sliderCurrentNum');
  const totalNum=document.getElementById('sliderTotalNum');
  if(!sectionModels||!sliderOuter||!sliderTrack||!cards.length)return;
  const total=cards.length;
  let currentIndex=0,autoPlay=null,isDragging=false,startX=0,prevTranslate=0,currentTranslate=0,hasEnteredSection2=false;
  totalNum.textContent=total;
  function getCardStep(){const activeCard=cards[currentIndex];const cardStyle=window.getComputedStyle(sliderTrack);const gap=parseFloat(cardStyle.columnGap||cardStyle.gap||60);return activeCard.offsetWidth+gap;}
  function getCenterOffset(index){const outerWidth=sliderOuter.offsetWidth;const cardWidth=cards[index].offsetWidth;const step=getCardStep();return(outerWidth/2)-(cardWidth/2)-(step*index);}
  function updateSlider(animate=true){
    cards.forEach((card,i)=>card.classList.toggle('is-active',i===currentIndex));
    dots.forEach((dot,i)=>dot.classList.toggle('active',i===currentIndex));
    currentNum.textContent=currentIndex+1;
    const target=getCenterOffset(currentIndex);
    prevTranslate=target;currentTranslate=target;
    sliderTrack.style.transition=animate?'transform .65s cubic-bezier(0.22,1,0.36,1)':'none';
    sliderTrack.style.transform=`translateX(${target}px)`;
  }
  function goTo(index,animate=true){currentIndex=(index+total)%total;updateSlider(animate);}
  function nextSlide(){goTo(currentIndex+1,true);}
  function prevSlide(){goTo(currentIndex-1,true);}
  function stopAutoPlay(){if(autoPlay){clearInterval(autoPlay);autoPlay=null;}}
  function startAutoPlay(){stopAutoPlay();autoPlay=setInterval(()=>nextSlide(),3200);}
  function resetToFirstCard(){stopAutoPlay();currentIndex=0;updateSlider(false);}
  prevBtn.addEventListener('click',(e)=>{e.preventDefault();e.stopPropagation();prevSlide();if(hasEnteredSection2)startAutoPlay();});
  nextBtn.addEventListener('click',(e)=>{e.preventDefault();e.stopPropagation();nextSlide();if(hasEnteredSection2)startAutoPlay();});
  dots.forEach((dot,i)=>{dot.addEventListener('click',(e)=>{e.preventDefault();e.stopPropagation();goTo(i,true);if(hasEnteredSection2)startAutoPlay();});});
  sliderOuter.addEventListener('mouseenter',stopAutoPlay);
  sliderOuter.addEventListener('mouseleave',()=>{if(hasEnteredSection2)startAutoPlay();});
  sliderOuter.addEventListener('pointerdown',(e)=>{
    if(e.target.closest('.slider-btn')||e.target.closest('.slider-dot')||e.target.closest('.models-card-mini-btn'))return;
    isDragging=true;startX=e.clientX;stopAutoPlay();sliderTrack.style.transition='none';sliderOuter.setPointerCapture(e.pointerId);
  });
  sliderOuter.addEventListener('pointermove',(e)=>{if(!isDragging)return;const delta=e.clientX-startX;currentTranslate=prevTranslate+delta;sliderTrack.style.transform=`translateX(${currentTranslate}px)`;});
  function endDrag(e){
    if(!isDragging)return;isDragging=false;
    const movedBy=currentTranslate-prevTranslate;const threshold=80;
    if(movedBy<-threshold){currentIndex=(currentIndex+1)%total;}else if(movedBy>threshold){currentIndex=(currentIndex-1+total)%total;}
    updateSlider(true);if(hasEnteredSection2)startAutoPlay();
    if(e&&typeof e.pointerId!=='undefined'){try{sliderOuter.releasePointerCapture(e.pointerId);}catch(error){}}
  }
  sliderOuter.addEventListener('pointerup',endDrag);
  sliderOuter.addEventListener('pointercancel',endDrag);
  sliderOuter.addEventListener('pointerleave',endDrag);
  const observer=new IntersectionObserver((entries)=>{
    const entry=entries[0];if(!entry)return;
    if(entry.isIntersecting&&entry.intersectionRatio>0.45){
      if(!hasEnteredSection2){hasEnteredSection2=true;resetToFirstCard();requestAnimationFrame(()=>{updateSlider(false);startAutoPlay();});}
    }else{hasEnteredSection2=false;stopAutoPlay();}
  },{threshold:[0,0.45,0.6]});
  observer.observe(sectionModels);
  window.addEventListener('resize',()=>{if(hasEnteredSection2){updateSlider(false);}else{resetToFirstCard();}});
  window.addEventListener('load',()=>resetToFirstCard());
  resetToFirstCard();
})();

/* ===== INIT ===== */
window.addEventListener('load',()=>{runIntro();initModelsParticles();});

/* ===== HERO <-> SCROLL ===== */
(function(){
  const heroBlock=document.getElementById('fp-hero-block');
  const mainScroll=document.getElementById('main-scroll');
  const fpDots=document.getElementById('fpDots');
  const logoLink=document.querySelector('.logo-link');
  const topNav=document.getElementById('topNav');

  /* 섹션 ID 배열: 도트 인덱스와 1:1 대응 */
  const sectionIds=[
    'fp-hero-block',   /* 0 */
    'section-models',  /* 1 */
    'section-explore', /* 2 */
    'section-tech',    /* 3 */
    'section-beyond',  /* 4 */
    'section-cta',     /* 5 */
    'section-footer',  /* 6 */
  ];

  let heroOut=false,animating=false,touchStartY=0,touchLastY=0,pendingSectionId=null;

  /* ?? ?ы띁 ?? */
  function isHeroOut(){ return heroOut; }

  function updateDots(idx){
    document.querySelectorAll('.fp-dot').forEach((dot,i)=>dot.classList.toggle('active',i===idx));
  }

  function setHeaderVisible(visible){
    if(!topNav)return;
    topNav.classList.toggle('nav-hidden',!visible);
    topNav.classList.toggle('nav-show',visible);
  }

  function revealVisibleElements(){
    document.querySelectorAll('#main-scroll .reveal:not(.in)').forEach(el=>{
      const rect=el.getBoundingClientRect();if(rect.top<window.innerHeight*0.88){el.classList.add('in');}
    });
  }

  function getActiveSection(){
    if(!heroOut)return 0;
    const ids=sectionIds.slice(1);
    const scrollY=mainScroll.scrollTop;
    let active=1;
    ids.forEach((id,i)=>{
      const sec=document.getElementById(id);
      if(!sec)return;
      if(scrollY>=sec.offsetTop-window.innerHeight*0.45){active=i+1;}
    });
    return active;
  }

  function getSectionScrollTop(id){
    const target=document.getElementById(id);
    if(!target)return 0;
    const isTabletLandscape=window.innerWidth>=901&&window.innerWidth<=1199&&window.innerHeight<=820;
    const offset=isTabletLandscape&&id==='section-models'?86:0;
    return target.offsetTop+offset;
  }

  function isTabletLandscapeView(){
    return window.innerWidth>=901&&window.innerWidth<=1199&&window.innerHeight<=820;
  }

  function showScroll(goTop=true,targetId='section-models'){
    if(heroOut||animating)return;
    animating=true;heroOut=true;
    clearHeroCarTimers();
    if(goTop)mainScroll.scrollTop=getSectionScrollTop(targetId);
    heroBlock.classList.remove('hero-return-start','hero-return-active');
    heroBlock.classList.add('hero-out');
    mainScroll.classList.add('visible');
    setTimeout(()=>{
      revealVisibleElements();
      updateDots(getActiveSection());
      if(isTabletLandscapeView()){
        setHeaderVisible(true);
        setTimeout(()=>setHeaderVisible(false),750);
      }else{
        setHeaderVisible(false);
      }
      animating=false;
      if(pendingSectionId){
        const nextId=pendingSectionId;
        pendingSectionId=null;
        scrollToSection(nextId);
      }
    },700);
  }

  function showHero(){
    if(!heroOut||animating)return;
    if(mainScroll.scrollTop>0){mainScroll.scrollTo({top:0,behavior:'smooth'});setTimeout(showHero,420);return;}
    animating=true;heroOut=false;
    mainScroll.classList.remove('visible');
    heroBlock.classList.remove('hero-out');
    heroBlock.classList.add('hero-return-start');
    void heroBlock.offsetWidth;
    heroBlock.classList.add('hero-return-active');
    setTimeout(()=>{
      heroBlock.classList.remove('hero-return-start','hero-return-active');
      updateDots(0);
      setHeaderVisible(true);
      replayCarSequenceQuick();
      animating=false;
    },900);
  }

  /* ?? ?ㅽ겕濡??대룞 ?ы띁 ?? */
  function scrollToSection(id){
    if(id==='fp-hero-block'){showHero();return;}
    const target=document.getElementById(id);
    if(!target||!mainScroll)return;
    const idx=sectionIds.indexOf(id);
    if(idx>-1)updateDots(idx);
    const scrollTop=getSectionScrollTop(id);
    setHeaderVisible(false);
    if(typeof gsap!=='undefined'){
      const distance=Math.abs(mainScroll.scrollTop-scrollTop);
      const duration=Math.min(0.68,Math.max(0.32,(distance/window.innerHeight)*0.22));
      gsap.killTweensOf(mainScroll);
      gsap.to(mainScroll,{scrollTop,duration,ease:'power2.out',overwrite:true,onUpdate:()=>updateDots(getActiveSection()),onComplete:()=>updateDots(getActiveSection())});
    }else{
      mainScroll.scrollTo({top:scrollTop,behavior:'auto'});
    }
  }

  /* ?? ??/ ?곗튂 ?? */
  window.addEventListener('wheel',(e)=>{
    if(animating)return;
    if(!heroOut&&e.deltaY>30){showScroll(true);return;}
    if(heroOut&&mainScroll.scrollTop<=0&&e.deltaY<-30){showHero();}
  },{passive:true});

  window.addEventListener('touchstart',(e)=>{
    touchStartY=e.touches[0].clientY;
    touchLastY=touchStartY;
  },{passive:true});
  window.addEventListener('touchmove',(e)=>{
    if(animating)return;
    const currentY=e.touches[0].clientY;
    const deltaY=touchStartY-currentY;
    const stepY=touchLastY-currentY;
    touchLastY=currentY;
    if(!heroOut&&deltaY>18){
      showScroll(true);
      return;
    }
    if(heroOut&&mainScroll.scrollTop<=0&&stepY<-18){
      showHero();
    }
  },{passive:true});

  /* ?? ?ㅽ겕濡???dot ?낅뜲?댄듃 + reveal ?? */
  mainScroll.addEventListener('scroll',()=>{
    revealVisibleElements();
    updateDots(getActiveSection());
  });

  /* ?? ?곗륫 dot ?대┃ ???뱀뀡 ?대룞 ?? */
  document.querySelectorAll('.fp-dot').forEach((dot,i)=>{
    dot.addEventListener('click',(e)=>{
      e.preventDefault();
      e.stopPropagation();
      const targetId=sectionIds[i];
      if(!targetId)return;
      updateDots(i);

      if(targetId==='fp-hero-block'){
        showHero();
        return;
      }

      if(!heroOut){
        /* ?덉뼱濡쒖뿉???ㅽ겕濡??곸뿭?쇰줈 ?꾪솚 ???대룞 */
        pendingSectionId=null;
        showScroll(true,targetId);
      }else{
        scrollToSection(targetId);
      }
    });
  });

  /* ?? 踰꾪듉 ?곌껐 ?? */
  document.querySelector('.btn-primary')?.addEventListener('click',()=>{
    if(!heroOut)showScroll(true,'section-models');
    else scrollToSection('section-models');
  });
  document.querySelector('.btn-secondary')?.addEventListener('click',()=>{
    if(!heroOut)showScroll(true,'section-explore');
    else scrollToSection('section-explore');
  });

  /* ?? 濡쒓퀬 ?대┃ ???덉뼱濡?蹂듦? ?? */
  logoLink?.addEventListener('click',(e)=>{
    e.preventDefault();
    const logo=logoLink.closest('.logo');
    logo?.classList.remove('logo-click-glow');
    void logo?.offsetWidth;
    logo?.classList.add('logo-click-glow');
    setTimeout(()=>logo?.classList.remove('logo-click-glow'),760);
    showHero();
  });

  updateDots(0);
})();

/* ===== SECTION 3 ANIMATIONS ===== */
(function(){
  const head=document.getElementById('exploreHead');
  const featureCard=document.getElementById('exploreShowcaseCard');
  const miniList=document.getElementById('exploreMiniList');
  if(!head||!featureCard||!miniList)return;
  const observer=new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
      if(entry.isIntersecting){
        head.classList.add('in');
        setTimeout(()=>featureCard.classList.add('in'),120);
        setTimeout(()=>miniList.classList.add('in'),260);
        observer.disconnect();
      }
    });
  },{threshold:0.18});
  observer.observe(featureCard);
})();

/* ===== SECTION 3 CLICK GALLERY ===== */
function initExploreGallery(){
  const cards=document.querySelectorAll('.explore-mini-card');
  const showcase=document.getElementById('exploreShowcaseCard');
  const mainImage=document.getElementById('exploreMainImage');
  const mainLabel=document.getElementById('exploreLabel');
  const mainName=document.getElementById('exploreName');
  const mainDesc=document.getElementById('exploreDesc');
  const specPowertrain=document.getElementById('specPowertrain');
  const specTopSpeed=document.getElementById('specTopSpeed');
  const specAcceleration=document.getElementById('specAcceleration');
  const specCharacter=document.getElementById('specCharacter');
  const mainBtn=document.getElementById('exploreMainBtn');
  if(!cards.length||!showcase)return;
  function updateShowcase(card,index){
    showcase.classList.add('is-switching');
    setTimeout(()=>{
      mainImage.src=card.dataset.image;mainImage.alt=card.dataset.name;
      mainLabel.textContent=card.dataset.label;mainName.textContent=card.dataset.name;
      mainDesc.textContent=card.dataset.desc;specPowertrain.textContent=card.dataset.powertrain;
      specTopSpeed.textContent=card.dataset.topSpeed;specAcceleration.textContent=card.dataset.acceleration;
      specCharacter.textContent=card.dataset.character;mainBtn.setAttribute('href',card.dataset.link||'#');
      showcase.classList.remove('model-big','model-first','model-last');
      if(index===0){showcase.classList.add('model-first');}
      if(index===6){showcase.classList.add('model-last');}
      if(index>=1&&index<=5){showcase.classList.add('model-big');}
      requestAnimationFrame(()=>showcase.classList.remove('is-switching'));
    },240);
  }
  cards.forEach((card,i)=>{
    card.addEventListener('click',()=>{
      if(card.classList.contains('is-active'))return;
      cards.forEach(c=>c.classList.remove('is-active'));
      card.classList.add('is-active');updateShowcase(card,i);
    });
  });
  const initialIndex=Array.from(cards).findIndex(card=>card.classList.contains('is-active'));
  const activeIndex=initialIndex>=0?initialIndex:0;
  showcase.classList.remove('model-big','model-first','model-last');
  if(activeIndex===0){showcase.classList.add('model-first');}
  if(activeIndex===6){showcase.classList.add('model-last');}
  if(activeIndex>=1&&activeIndex<=5){showcase.classList.add('model-big');}
}
document.addEventListener('DOMContentLoaded',()=>initExploreGallery());

/* ===== SECTION 3 MOBILE MINI SLIDER ===== */
(function(){
  const mobileQuery=window.matchMedia('(max-width: 768px)');
  const list=document.getElementById('exploreMiniList');
  const section=document.getElementById('section-explore');
  if(!list||!section)return;
  const cards=Array.from(list.querySelectorAll('.explore-mini-card'));
  if(!cards.length)return;

  let ui=null;
  let indicators=[];
  let progressBar=null;
  let autoplayTimer=null;
  let userScrollTimer=null;
  let currentIndex=0;

  function ensureUi(){
    if(ui)return;
    ui=document.createElement('div');
    ui.className='explore-mini-slider-ui';
    ui.innerHTML='<div class="explore-mini-progress" aria-label="Explore mini slider progress"><span class="explore-mini-progress-bar"></span></div>';
    list.insertAdjacentElement('afterend',ui);
    progressBar=ui.querySelector('.explore-mini-progress-bar');
    indicators=[];
  }

  function setUiVisible(visible){
    ensureUi();
    ui.style.display=visible?'flex':'none';
  }

  function getNearestIndex(){
    const center=list.scrollLeft+(list.clientWidth/2);
    let nearest=0;
    let distance=Infinity;
    cards.forEach((card,index)=>{
      const cardCenter=card.offsetLeft+(card.offsetWidth/2);
      const nextDistance=Math.abs(cardCenter-center);
      if(nextDistance<distance){
        distance=nextDistance;
        nearest=index;
      }
    });
    return nearest;
  }

  function updateUi(index=getNearestIndex()){
    currentIndex=index;
    indicators.forEach((dot,i)=>dot.classList.toggle('is-active',i===index));
    if(progressBar){
      const track=progressBar.parentElement;
      const trackWidth=track?track.clientWidth:0;
      const barWidth=cards.length?trackWidth/cards.length:trackWidth;
      const travel=Math.max(0,trackWidth-barWidth);
      const x=cards.length>1?travel*(index/(cards.length-1)):0;
      progressBar.style.width=`${barWidth}px`;
      progressBar.style.transform=`translateX(${x}px)`;
    }
  }

  function scrollToCard(index){
    const card=cards[index];
    if(!card)return;
    const targetLeft=card.offsetLeft-(list.clientWidth-card.offsetWidth)/2;
    const maxLeft=Math.max(0,list.scrollWidth-list.clientWidth);
    const left=Math.min(maxLeft,Math.max(0,targetLeft));
    list.scrollTo({left,behavior:'smooth'});
    updateUi(index);
  }

  function nextCard(){
    if(!mobileQuery.matches)return;
    const next=(currentIndex+1)%cards.length;
    scrollToCard(next);
  }

  function startAutoplay(){
    if(!mobileQuery.matches||autoplayTimer)return;
    autoplayTimer=setInterval(nextCard,3400);
  }

  function stopAutoplay(){
    clearInterval(autoplayTimer);
    autoplayTimer=null;
  }

  function setup(){
    if(!mobileQuery.matches){
      stopAutoplay();
      if(ui)ui.style.display='none';
      list.scrollLeft=0;
      return;
    }
    setUiVisible(true);
    updateUi();
    startAutoplay();
  }

  list.addEventListener('scroll',()=>{
    if(!mobileQuery.matches)return;
    updateUi();
    stopAutoplay();
    clearTimeout(userScrollTimer);
    userScrollTimer=setTimeout(startAutoplay,1600);
  },{passive:true});

  list.addEventListener('pointerdown',stopAutoplay);
  list.addEventListener('pointerup',()=>{if(mobileQuery.matches)startAutoplay();});
  list.addEventListener('pointercancel',()=>{if(mobileQuery.matches)startAutoplay();});

  const observer=new IntersectionObserver((entries)=>{
    const visible=entries[0]?.isIntersecting;
    if(visible&&mobileQuery.matches)startAutoplay();
    else stopAutoplay();
  },{threshold:0.35});
  observer.observe(section);

  mobileQuery.addEventListener('change',setup);
  window.addEventListener('resize',()=>{if(mobileQuery.matches)updateUi();});
  document.addEventListener('DOMContentLoaded',setup);
  setup();
})();

/* ===== SECTION 4 REVEAL ===== */
(function(){
  const techSection=document.querySelector('#section-tech');
  const techContent=document.querySelector('.tech-content');
  const techVisual=document.querySelector('.tech-visual');
  const techKicker=document.querySelector('.tech-kicker');
  const techSub=document.querySelector('.tech-sub');
  const techTitleLines=Array.from(document.querySelectorAll('.tech-title-line'));
  const techBodyItems=Array.from(document.querySelectorAll('.tech-desc, .tech-spec, .tech-btn, .tech-link'));
  if(!techSection||!techContent||!techVisual||!techKicker||!techSub)return;
  let techTitleAnimated=false;

  function typeTechTitle(){
    if(techTitleAnimated||!techTitleLines.length)return;
    techTitleAnimated=true;
    techContent.classList.add('is-typing');

    const kickerText='04 - ENGINEERING';
    const subText='ENGINEERED FOR THE EXTREME';
    techKicker.textContent='';
    techSub.textContent='';
    [...kickerText].forEach((char,charIndex)=>{
      setTimeout(()=>{
        techKicker.textContent+=char;
      },charIndex*52);
    });

    const kickerDuration=(kickerText.length*52)+180;
    let titleCompletionDelay=kickerDuration;

    techTitleLines.forEach((line,index)=>{
      const fullText=line.dataset.text||line.textContent.trim();
      line.textContent='';
      setTimeout(()=>{
        [...fullText].forEach((char,charIndex)=>{
          setTimeout(()=>{
            line.textContent+=char;
          },charIndex*58);
        });
      },kickerDuration+(index*460));
      titleCompletionDelay=Math.max(titleCompletionDelay,kickerDuration+(index*460)+(fullText.length*58));
    });

    const subStartDelay=titleCompletionDelay+220;
    [...subText].forEach((char,charIndex)=>{
      setTimeout(()=>{
        techSub.textContent+=char;
      },subStartDelay+(charIndex*34));
    });
    titleCompletionDelay=subStartDelay+(subText.length*34);

    setTimeout(()=>{
      techContent.classList.add('body-in');
    },titleCompletionDelay+180);
  }

  const observer=new IntersectionObserver((entries)=>{
    const entry=entries[0];
    if(entry.isIntersecting&&entry.intersectionRatio>=0.28){
      techContent.classList.add('show');techVisual.classList.add('show');
      techContent.classList.remove('hide');techVisual.classList.remove('hide');
      if(techTitleAnimated){
        techContent.classList.add('is-typing');
        setTimeout(()=>{
          if(techContent.classList.contains('show')){
            techContent.classList.add('body-in');
          }
        },120);
      }else{
        typeTechTitle();
      }
    }else{
      techContent.classList.remove('show');techVisual.classList.remove('show');
      techContent.classList.add('hide');techVisual.classList.add('hide');
      techContent.classList.remove('body-in');
      techContent.classList.remove('is-typing');
      techBodyItems.forEach((item)=>{
        item.style.transitionDelay='';
      });
    }
  },{threshold:[0,0.28,0.5]});
  observer.observe(techSection);
})();

/* ===== SECTION 5 BEYOND DRIVING REVEAL ===== */
(function(){
  const section=document.getElementById('section-beyond');
  if(!section)return;
  const bg=section.querySelector('.beyond-bg');
  const reveals=section.querySelectorAll('.beyond-reveal');
  const sideLine=section.querySelector('.beyond-side-line');
  const mobileBeyondQuery=window.matchMedia('(max-width: 768px)');
  const revealObserver=new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        section.classList.add('beyond-animate-in');
        if(mobileBeyondQuery.matches&&sideLine){
          sideLine.style.clipPath='none';
          sideLine.style.transition='none';
          sideLine.classList.add('mobile-line-active');
        }
        reveals.forEach((el,i)=>setTimeout(()=>el.classList.add('in'),i*140));
        revealObserver.unobserve(entry.target);
      }
    });
  },{threshold:0.08});
  revealObserver.observe(section);
  let mouseX=0,mouseY=0,currentX=0,currentY=0,rafId=null;
  section.addEventListener('mousemove',(e)=>{const rect=section.getBoundingClientRect();mouseX=((e.clientX-rect.left)/rect.width-0.5)*2;mouseY=((e.clientY-rect.top)/rect.height-0.5)*2;});
  section.addEventListener('mouseleave',()=>{mouseX=0;mouseY=0;});
  function animateParallax(){
    if(mobileBeyondQuery.matches){
      const rect=section.getBoundingClientRect();
      const viewport=window.innerHeight||document.documentElement.clientHeight||1;
      const progress=Math.max(0,Math.min(1,(viewport-rect.top)/(viewport+rect.height)));
      mouseX=(progress-0.5)*1.2;
      mouseY=(0.5-progress)*1.55;
    }
    currentX+=(mouseX-currentX)*0.06;currentY+=(mouseY-currentY)*0.06;
    if(bg){bg.style.transform=`scale(1.1) translate(${currentX*20}px, ${currentY*15}px)`;}
    rafId=requestAnimationFrame(animateParallax);
  }
  const rafObserver=new IntersectionObserver((entries)=>{
    if(entries[0].isIntersecting){if(!rafId)rafId=requestAnimationFrame(animateParallax);}
    else{cancelAnimationFrame(rafId);rafId=null;}
  },{threshold:0.1});
  rafObserver.observe(section);
  const titleLines=section.querySelectorAll('.beyond-title-line');
  let typingDone=false;
  function typeText(el,delay){
    const originalText=el.textContent.trim();el.textContent='';el.style.opacity='1';
    [...originalText].forEach((char,i)=>setTimeout(()=>el.textContent+=char,delay+i*55));
  }
  const typingObserver=new IntersectionObserver((entries)=>{
    if(entries[0].isIntersecting&&!typingDone){
      typingDone=true;
      const beyondLen=titleLines[0]?titleLines[0].textContent.trim().length:6;
      if(titleLines[0])typeText(titleLines[0],300);
      if(titleLines[1])typeText(titleLines[1],300+beyondLen*55+100);
      typingObserver.unobserve(entries[0].target);
    }
  },{threshold:0.12});
  typingObserver.observe(section);
  titleLines.forEach(el=>{el.style.opacity='0';});
  if(sideLine){
    if(mobileBeyondQuery.matches){
      sideLine.style.clipPath='none';
      sideLine.style.transition='none';
      sideLine.classList.add('mobile-line-active');
      return;
    }
    sideLine.style.clipPath='inset(0 0 100% 0)';sideLine.style.transition='clip-path 1.1s cubic-bezier(0.22,1,0.36,1) 0.2s';
    const lineObserver=new IntersectionObserver((entries)=>{
      if(entries[0].isIntersecting){sideLine.style.clipPath='inset(0 0 0% 0)';lineObserver.unobserve(entries[0].target);}
    },{threshold:0.2});
    lineObserver.observe(section);
  }
})();

/* ===== CTA ??吏꾩엯 ?좊땲 + ?レ옄 移댁슫?몄뾽 ===== */
(function(){
  const ctaSection=document.getElementById('section-cta');
  const ctaInner=ctaSection?ctaSection.querySelector('.cta-inner'):null;
  if(!ctaSection||!ctaInner)return;
  function countUp(el,target,suffix,duration){
    let start=0;const step=target/(duration/16);
    const timer=setInterval(()=>{start=Math.min(start+step,target);el.textContent=Math.floor(start)+suffix;if(start>=target)clearInterval(timer);},16);
  }
  new IntersectionObserver((entries)=>{
    if(entries[0].isIntersecting){
      ctaInner.classList.add('cta-in');
      setTimeout(()=>{
        ctaSection.querySelectorAll('.cta-stat-num').forEach((el)=>{
          const text=el.textContent.trim();const suffix=text.replace(/[\d.]/g,'');const num=parseFloat(text);
          if(isNaN(num))return;el.textContent='0'+suffix;countUp(el,num,suffix,1400);
        });
      },500);
    }
  },{threshold:0.25}).observe(ctaSection);
})();

/* ===== SECTION 2 ??移대뱶 3D 留덉슦???명듃 ===== */
(function(){
  const sliderOuter=document.getElementById('modelsSliderOuter');
  if(!sliderOuter)return;
  let tiltRaf=null,targetRX=0,targetRY=0,currentRX=0,currentRY=0,isHovering=false,tiltCard=null;
  sliderOuter.addEventListener('mousemove',(e)=>{
    const activeCard=sliderOuter.querySelector('.models-card.is-active');if(!activeCard)return;
    if(tiltCard&&tiltCard!==activeCard){
      tiltCard.style.removeProperty('transform');
      tiltCard.style.removeProperty('--models-card-tilt-transform');
      currentRX=0;currentRY=0;
    }
    tiltCard=activeCard;
    isHovering=true;const rect=activeCard.getBoundingClientRect();
    targetRY=((e.clientX-rect.left-rect.width/2)/(rect.width/2))*5;
    targetRX=((e.clientY-rect.top-rect.height/2)/(rect.height/2))*-3;
    if(!tiltRaf)tiltRaf=requestAnimationFrame(animateTilt);
  });
  sliderOuter.addEventListener('mouseleave',()=>{isHovering=false;targetRX=0;targetRY=0;});
  function animateTilt(){
    currentRX+=(targetRX-currentRX)*0.10;currentRY+=(targetRY-currentRY)*0.10;
    const activeCard=sliderOuter.querySelector('.models-card.is-active');
    if(activeCard){
      tiltCard=activeCard;
      const transformValue=`scale(1.04) perspective(1200px) rotateX(${currentRX}deg) rotateY(${currentRY}deg)`;
      activeCard.style.setProperty('--models-card-tilt-transform',transformValue);
      activeCard.style.setProperty('transform',transformValue,'important');
    }
    if(isHovering||Math.abs(targetRX-currentRX)>0.02||Math.abs(targetRY-currentRY)>0.02){tiltRaf=requestAnimationFrame(animateTilt);}
    else{
      tiltCard?.style.removeProperty('transform');
      tiltCard?.style.removeProperty('--models-card-tilt-transform');
      tiltCard=null;tiltRaf=null;
    }
  }
})();

/* ===== SECTION 2 카운트 바운스 ===== */
(function(){
  const el=document.getElementById('sliderCurrentNum');if(!el)return;
  new MutationObserver(()=>{
    el.animate([{transform:'translateY(-8px)',opacity:0},{transform:'translateY(0)',opacity:1}],{duration:320,easing:'cubic-bezier(0.22,1,0.36,1)',fill:'forwards'});
  }).observe(el,{childList:true,characterData:true,subtree:true});
})();

/* ===== SECTION 2 ??deco lines 媛?쒖꽦 ===== */
(function(){
  const section=document.getElementById('section-models');
  const lines=section?section.querySelectorAll('.deco-line'):[];if(!lines.length)return;
  new IntersectionObserver((entries)=>{
    lines.forEach(l=>{l.style.animationPlayState=entries[0].isIntersecting?'running':'paused';});
  },{threshold:0.1}).observe(section);
})();

/* ===== SECTION 3 ??showcase ?대?吏 ?⑤윺?숈뒪 ===== */
(function(){
  const card=document.getElementById('exploreShowcaseCard');
  const img=document.getElementById('exploreMainImage');
  if(!card||!img)return;
  let mx=0,my=0,cx=0,cy=0,raf=null;
  card.addEventListener('mousemove',(e)=>{const r=card.getBoundingClientRect();mx=((e.clientX-r.left)/r.width-0.5)*2;my=((e.clientY-r.top)/r.height-0.5)*2;if(!raf)raf=requestAnimationFrame(loop);});
  card.addEventListener('mouseleave',()=>{mx=0;my=0;});
  function loop(){cx+=(mx-cx)*0.08;cy+=(my-cy)*0.08;img.style.transform=`translate(${cx*12}px, ${cy*7}px) scale(1.02)`;if(Math.abs(mx-cx)>0.005||Math.abs(my-cy)>0.005){raf=requestAnimationFrame(loop);}else{raf=null;}}
})();

/* ===== SECTION 3 ??誘몃땲 移대뱶 吏꾩엯 ?뚰듃 ===== */
(function(){
  const section=document.getElementById('section-explore');
  const cards=section?Array.from(section.querySelectorAll('.explore-mini-card')):[];
  if(!section||!cards.length)return;
  let timers=[];
  let repeatTimer=null;
  function isPcViewport(){
    return window.innerWidth>1024;
  }
  function clearTimers(){
    timers.forEach(timer=>clearTimeout(timer));
    timers=[];
    clearInterval(repeatTimer);
    repeatTimer=null;
  }
  function runHintWave(){
    timers.forEach(timer=>clearTimeout(timer));
    timers=[];
    cards.forEach((c,i)=>{
      timers.push(setTimeout(()=>{
        if(!c)return;
        c.style.boxShadow='0 0 0 1.5px rgba(200,20,36,0.55), 0 0 20px rgba(160,10,22,0.20)';
        timers.push(setTimeout(()=>{c.style.boxShadow='';},650));
      },2200+i*260));
    });
  }
  new IntersectionObserver((entries)=>{
    if(entries[0].isIntersecting){
      if(isPcViewport()){
        clearTimers();
        runHintWave();
        repeatTimer=setInterval(runHintWave,7200);
      }else if(!section.dataset.miniHintDone){
        section.dataset.miniHintDone='true';
        cards.forEach((c,i)=>{
          setTimeout(()=>{if(!c)return;c.style.boxShadow='0 0 0 1.5px rgba(200,20,36,0.55), 0 0 20px rgba(160,10,22,0.20)';setTimeout(()=>{c.style.boxShadow='';},650);},2200+i*260);
        });
      }
    }else{
      clearTimers();
    }
  },{threshold:0.4}).observe(section);
})();

/* ===== SECTION 7 ??FOOTER 吏꾩엯 ?좊땲 ===== */
(function(){
  const section=document.getElementById('section-footer');
  if(!section)return;
  const horseWrap  = section.querySelector('.footer-horse-wrap');
  const borderline = section.querySelector('.footer-borderline');
  const wordmark   = section.querySelector('.footer-wordmark');
  const menu       = section.querySelector('.footer-menu');
  const sns        = section.querySelector('.footer-sns');
  const copyright  = section.querySelector('.footer-copyright');
  const steps=[
    [horseWrap,'horse-in',150],
    [borderline,'line-in',360],
    [wordmark,'wordmark-in',520],
    [menu,'menu-in',680],
    [sns,'sns-in',840],
    [copyright,'copy-in',980]
  ];
  let active=false;
  let timers=[];
  function resetFooter(){
    timers.forEach(clearTimeout);
    timers=[];
    steps.forEach(([el,className])=>el?.classList.remove(className));
  }
  resetFooter();
  new IntersectionObserver((entries)=>{
    const entry=entries[0];
    if(entry.isIntersecting&&entry.intersectionRatio>=0.08){
      if(active)return;
      active=true;
      resetFooter();
      steps.forEach(([el,className,delay])=>{
        timers.push(setTimeout(()=>el?.classList.add(className),delay));
      });
      return;
    }
    active=false;
    resetFooter();
  },{threshold:[0,0.08,0.18]}).observe(section);
})();
