/**
 * Created by sina on 2016/5/17.
 */

class Loader{
    constructor(opt = {},offset = 60,container = window.body){
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
        let viewportHeight = $(window).height();
        let $el = $(el);
        let $elOffset = $el.offset();
        //console.log('上部分的位置：%d',offsetHeight - _offset);
        //console.log('下部分的位置：%d',offsetHeight + viewportHeight + _offset);
        //console.log('目标位置：%d',$elOffset.top);
        //简单方式仅仅判断左上角是否在显示区域就行，在就加载，不在不加载
        if((offsetHeight - _offset <= $elOffset.top)
            && (offsetHeight + viewportHeight + _offset >= $elOffset.top)){
            return true;
        }else{
            return false;
        }
    }
    initEvent(){
        let _timeId;
        /*['resize','sroll','ready'].forEach((name)=>{
            $(window).bind(name,()=>{
                console.log('xxxxxxxxxxxxxx');
                _timeId = setTimeout(()=>{
                    this.scanImg();
                },30);
            });
        });*/
        $(window).bind('scroll',()=>{
            //console.log('xxxxxxxxxxxxxx');
            _timeId = setTimeout(()=>{
                this.scanImg();
            },30);
        });
    }
    scanImg(){
        let $imgs = $('img[data-src]',this.container);
        Array.prototype.forEach.call($imgs,(img)=>{
            //console.log(this.isInView(img));
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


module.exports = Loader;