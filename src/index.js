/**
 * Created by sina on 2016/5/17.
 */
let $ = require('jquery');
class Loader{
    constructor(opt,offset,container){
        this.opt = opt;
        this.offset = offset;
        this.container = container;
    }
    init(){
        this.initEvent();
    }
    isInView(el){
        let _offset = this.offset;
        let offsetHeight = $(window).scrollTop();
        let offsetWidth = $(window).scrollLeft();
        let viewportHeight = $(window).height();
        let viewportWidth = $(window).width();
        let $el = $(el);
        let $elOffset = $el.offset();
        //简单方式仅仅判断左上角是否在显示区域就行，在就加载，不在不加载
        if((offsetWidth + viewportWidth > $elOffset.left - _offset)
            && (offsetWidth < $elOffset.left - _offset)
            && (offsetHeight < $elOffset.top - _offset)
            && (offsetHeight + viewportHeight > $elOffset.top - _offset)){
            return true;
        }else{
            return false;
        }
    }
    initEvent(){
        let _timeId;
        ['resize','sroll','ready'].forEach((name)=>{
            $(window).bind(name,()=>{
                if(_timeId){
                    clearTimeout(_timeId);
                }
                _timeId = setTimeout(()=>{
                    this.scanImg();
                },30);
            });
        });
    }
    scanImg(){
        let $imgs = $('img[data-src]',this.container);
        Array.prototype.forEach.call($imgs,(img)=>{
            if(this.isInView(img)){
                renderImg(img);
            }
        });
    }
}
function renderImg(img){
    img.src = img.getAttribute('data-src');
    img.removeAttribute('data-src');
}


module.exports = {
    init: (opt = null, offset = 60, container = document.body)=> {
        return new Loader(opt,offset,container);
    }
};