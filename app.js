(function(){
  var b=document.getElementById('burger'),n=document.getElementById('nav');
  function zamknij(){n.classList.remove('otwarte');b.setAttribute('aria-expanded','false');b.setAttribute('aria-label','Otwórz menu');}
  b.addEventListener('click',function(){var o=n.classList.toggle('otwarte');b.setAttribute('aria-expanded',o?'true':'false');b.setAttribute('aria-label',o?'Zamknij menu':'Otwórz menu');});
  n.addEventListener('click',function(e){if(e.target.tagName==='A')zamknij();});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')zamknij();});

  // dolny pasek na telefonie dopiero po przewinieciu za glowny przycisk
  var mob=document.getElementById('mob'),cta=document.querySelector('[data-pasek]');
  if('IntersectionObserver' in window&&mob&&cta){
    new IntersectionObserver(function(w){var e=w[0];mob.classList.toggle('widac',!e.isIntersecting&&e.boundingClientRect.top<0);}).observe(cta);
  }

  // formularz: bez serwera, przygotowuje wiadomosc e-mail
  var f=document.getElementById('form'),info=document.getElementById('form-info');
  if(f)f.addEventListener('submit',function(e){
    e.preventDefault();
    var ok=true;
    ['imie','tel','tresc'].forEach(function(k){var el=f.elements[k];var pusty=!el.value.trim();el.classList.toggle('zle',pusty);if(pusty)ok=false;});
    if(!ok){info.textContent='Uzupełnij imię, telefon i krótki opis.';return;}
    var temat='Zapytanie ze strony: '+f.elements.temat.value;
    var tresc=f.elements.tresc.value.trim()+'\n\n'+f.elements.imie.value.trim()+'\nTelefon: '+f.elements.tel.value.trim()+(f.elements.miejsce.value.trim()?'\nMiejscowość: '+f.elements.miejsce.value.trim():'');
    info.textContent='Dziękujemy. Otwieramy program pocztowy z gotową wiadomością do biuro@mktermoinstal.pl.';
    location.href='mailto:biuro@mktermoinstal.pl?subject='+encodeURIComponent(temat)+'&body='+encodeURIComponent(tresc);
  });

  // galeria realizacji: podglad zdjecia
  var lb=document.getElementById('lb');
  if(lb&&lb.showModal){
    var przyc=[].slice.call(document.querySelectorAll('.siatka-r button')),img=lb.querySelector('img'),licz=document.getElementById('lb-licz'),i=0;
    function pokaz(k){i=(k+przyc.length)%przyc.length;var src=przyc[i].querySelector('img');img.src=src.src;img.alt=src.alt;licz.textContent=(i+1)+' / '+przyc.length;}
    przyc.forEach(function(p,k){p.addEventListener('click',function(){pokaz(k);lb.showModal();});});
    document.getElementById('lb-prev').onclick=function(){pokaz(i-1);};
    document.getElementById('lb-next').onclick=function(){pokaz(i+1);};
    document.getElementById('lb-zamk').onclick=function(){lb.close();};
    lb.addEventListener('click',function(e){if(e.target===lb)lb.close();});
    lb.addEventListener('keydown',function(e){if(e.key==='ArrowLeft')pokaz(i-1);if(e.key==='ArrowRight')pokaz(i+1);});
  }
})();
