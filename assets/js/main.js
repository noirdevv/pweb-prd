document.addEventListener('DOMContentLoaded',async()=>{
const root=document.body.dataset.root||'',page=document.body.dataset.page;
const NAV=`<header><div class="container nav"><a class="brand" href="{{root}}index.html"><span class="logo">SMA</span><span><b>SMA Negeri 1 Dawan</b><small>Desa Gunaksa, Kec. Dawan, Kab. Klungkung, Bali</small></span></a><button class="burger" aria-label="Buka menu" aria-expanded="false">&#9776;</button><ul class="menu"><li><a data-s="home" href="{{root}}index.html">Home</a></li><li class="dd"><a data-s="tentang" href="{{root}}tentang-kami/sejarah.html">Tentang Kami</a><ul class="sub"><li><a href="{{root}}tentang-kami/sejarah.html">Identitas & Sejarah</a></li><li><a href="{{root}}tentang-kami/visi-misi.html">Visi & Misi</a></li><li><a href="{{root}}tentang-kami/fasilitas.html">Fasilitas</a></li></ul></li><li class="dd"><a data-s="akademik" href="{{root}}akademik/kurikulum.html">Akademik</a><ul class="sub"><li><a href="{{root}}akademik/kurikulum.html">Kurikulum</a></li><li><a href="{{root}}akademik/jurusan.html">Jurusan</a></li><li><a href="{{root}}akademik/keunggulan.html">Program Unggulan</a></li></ul></li><li class="dd"><a data-s="kesiswaan" href="{{root}}kesiswaan/osis.html">Kesiswaan</a><ul class="sub"><li><a href="{{root}}kesiswaan/osis.html">OSIS</a></li><li><a href="{{root}}kesiswaan/ekstrakurikuler.html">Ekstrakurikuler</a></li><li><a href="{{root}}kesiswaan/galeri-aktivitas.html">Galeri Aktivitas</a></li><li><a href="{{root}}kesiswaan/statistik.html">Statistik Siswa</a></li><li><a href="{{root}}kesiswaan/prestasi.html">Prestasi</a></li></ul></li><li class="dd"><a data-s="media" href="{{root}}media/berita.html">Media</a><ul class="sub"><li><a href="{{root}}media/berita.html">Berita</a></li><li><a href="{{root}}media/pengumuman.html">Pengumuman</a></li><li><a href="{{root}}media/galeri.html">Galeri</a></li></ul></li><li class="dd"><a data-s="ppdb" href="{{root}}ppdb/syarat-alur.html">PPDB</a><ul class="sub"><li><a href="{{root}}ppdb/syarat-alur.html">Syarat & Alur</a></li><li><a href="{{root}}ppdb/daftar.html">Daftar Online</a></li></ul></li><li><a data-s="kontak" href="{{root}}kontak.html">Kontak</a></li></ul></div></header>`,FOOT=`<footer><div class="container"><div><b>SMA Negeri 1 Dawan</b><br>Desa Gunaksa, Kec. Dawan, Kab. Klungkung, Bali</div><div>Cerdas, Berkarakter, Berprestasi<br>&copy; {{year}} SMA Negeri 1 Dawan</div></div></footer>`;
const load=async(n,fb)=>{try{const r=await fetch(root+'components/'+n+'.html');if(!r.ok)throw 0;return await r.text()}catch(e){return fb}};
const fix=t=>t.replaceAll('{{root}}',root).replaceAll('{{year}}',new Date().getFullYear());
document.getElementById('navbar').innerHTML=fix(await load('navbar',NAV));
document.getElementById('footer').innerHTML=fix(await load('footer',FOOT));
document.querySelectorAll('.menu>li>a[data-s="'+page+'"]').forEach(a=>a.classList.add('active'));
const b=document.querySelector('.burger'),m=document.querySelector('.menu');
b.addEventListener('click',()=>{const o=m.classList.toggle('open');b.setAttribute('aria-expanded',o)});
const f=document.getElementById('contact-form');
if(f)f.addEventListener('submit',e=>{e.preventDefault();let ok=true;
f.querySelectorAll('[required]').forEach(el=>{let r='';const v=el.value.trim();
if(!v)r='Wajib diisi';else if(el.type==='email'&&!/^\S+@\S+\.\S+$/.test(v))r='Email tidak valid';else if(el.tagName==='TEXTAREA'&&v.length<10)r='Minimal 10 karakter';
const s=el.nextElementSibling;if(s&&s.classList.contains('err'))s.textContent=r;if(r)ok=false});
if(ok){document.querySelector('.ok').style.display='block';f.reset()}});
const q=document.querySelector('[data-filter]');
if(q)q.addEventListener('input',()=>{const t=q.value.toLowerCase();document.querySelectorAll('[data-list]>*').forEach(c=>c.style.display=c.textContent.toLowerCase().includes(t)?'':'none')});
const chips=document.querySelectorAll('.chip');
chips.forEach(c=>c.addEventListener('click',()=>{chips.forEach(x=>x.classList.remove('on'));c.classList.add('on');
document.querySelectorAll('.tile').forEach(t=>t.style.display=(c.dataset.cat==='Semua'||t.dataset.cat===c.dataset.cat)?'':'none')}));
const md=document.querySelector('.modal');
if(md){document.querySelectorAll('.tile').forEach(t=>t.addEventListener('click',()=>{md.firstElementChild.textContent=t.textContent;md.classList.add('open')}));
md.addEventListener('click',()=>md.classList.remove('open'));
document.addEventListener('keydown',e=>{if(e.key==='Escape')md.classList.remove('open')})}
});
