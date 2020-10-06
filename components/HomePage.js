import React, {useState, useRef,useEffect} from 'react';
import TweenMax from 'gsap';
import PollList from './PollList';
import { Button, List } from '@material-ui/core';
import Router from 'next/router';
function Topic(props){
    return (
        <a href="#" className={"scroll-item"+props.color} ref={props.pref}>
                    <h2>{props.name}</h2>
                    <span className="scroll-item-date"></span>
        </a>
    )
}
export default () => {
    const genre = ['Education','Lifestyle','Music','Food','Shop','Art','Sports','TV&Movies','Other'];
    const colors = ['',' red',' bees',' blue'];
    const scrollItems = genre.map((value)=>{
        return useRef(null);
    })
    const items = genre.map((value, index)=>{
        return (<Topic key={index} name={value} color={colors[index%4]} pref={scrollItems[index]}/>)
    });
    const [pos, setPos] = useState(0);
    const [prev, setPrev] = useState(true);
    const [next, setNext] = useState(false);
    const wrapper = useRef(null);
    const el = useRef(null);
    const filler = useRef(null);
    const position = useRef(null);
    const inner = useRef(null);
    // const btns = {prev: useRef(null), next: useRef(null)};
    const lerp = (a, b, n) => {
        return (1 - n) * a + n * b
      }
    const padding = 20; 
    let scrollNow = 0;  
    const offset = 150;
    const angle = 25;
    const z = 15;
    function setScroll(){
        if(!filler.current) return null;
        filler.current.style.width = inner.current.offsetWidth + padding*2 + 'px';
        position.current.style.width = wrapper.current.offsetWidth / (inner.current.offsetWidth + padding*2) * 100 + '%';
        let now = lerp(scrollNow, wrapper.current.scrollLeft, .15);
        TweenMax.set(el.current, {x: -now});
        TweenMax.set(position.current, {x: now / wrapper.current.offsetWidth * 100 + '%'});

        scrollItems.forEach(item => {
            let elPos = item.current.offsetLeft + item.current.offsetWidth / 2 - scrollNow;
            if (elPos > wrapper.current.offsetWidth - offset) {
            let q = (wrapper.current.offsetWidth - elPos) / offset;
            TweenMax.set(item.current, {rotateY: -(angle - q * angle), z: z - z * q})
            } else if (elPos < offset) {
            let q = elPos / offset;
            TweenMax.set(item.current, {rotateY: angle - q * angle, z: z - z * q})
            } else {
            TweenMax.set(item.current, {rotateY: 0, z: 0});
            }
        });
        scrollNow = now;

        if (wrapper.current.scrollLeft === 0) setPrev(true);
        else if (inner.current.offsetWidth - wrapper.current.scrollLeft === wrapper.current.offsetWidth - padding*2) setNext(true);
        else {setPrev(false); setNext(false);}
        // console.log(btns.next.current.disabled);
        // console.log(btns.prev.current.disabled);
        requestAnimationFrame(setScroll);
    }
    useEffect(() => {
        setScroll();
    },[pos,prev,next]);
    useEffect(()=>{
        return () => {
            console.log("Clean up");
        }
    });
    function nextBtn() {
        console.log("Next!!");
        var newPos = wrapper.current.scrollLeft;
        newPos += document.querySelector('.scroll-item').offsetWidth*2 - 20;
        wrapper.current.scrollLeft = newPos;
        console.log(document.querySelector('.scroll-item').offsetWidth);
        console.log(newPos);
        setPos(newPos);
      }
    function prevBtn() {
        console.log("Prev!!");
        var newPos = wrapper.current.scrollLeft;
        newPos -= document.querySelector('.scroll-item').offsetWidth*2 - 20;
        wrapper.current.scrollLeft = newPos;
        console.log(document.querySelector('.scroll-item').offsetWidth);
        console.log(newPos);
        setPos(newPos);
    }
    return (
        <div>
        <div className='header-app'>
        <h1>Home</h1>
        </div>  
        <div className="scroll-wrapper" ref={wrapper}>
        <div className="scroll-filler" ref={filler}></div>
        <div className="scroll" ref={el}>
            <div className="scroll-inner" ref={inner}>
                {items}
            </div>
        </div>
    </div>
    <div className="scroll-position-wrapper">
        <button className="scroll-btn prev" onClick={prevBtn} disabled={prev}></button>
        <div className="scroll-position">
            <div className="scroll-position-inner" ref={position}></div>
        </div>
        <button className="scroll-btn next" onClick={nextBtn} disabled={next}></button>
    </div>
    <Button onClick={()=>Router.push('/createpoll')}>Create a Poll</Button>
    <List>
    <PollList filter={(data)=>data.type==='public'} chart={false}/>
    </List>
    </div>
    )
}