'use client'
import React, { useEffect } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import { DotButton, useDotButton } from './embladots'
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from './emblacarousel-buttons'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'

type SlideType = {
  imageUrl?: string | undefined;
  type?: string | undefined;
};

type PropType = {
  slides: SlideType[] | undefined;
  options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props

  console.log(slides)
  const [emblaRef, emblaApi] = useEmblaCarousel(options)

  console.log(slides)
  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi)

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  useEffect(() => {
    if (emblaApi){console.log(emblaApi)}}, [emblaApi])
  return (
    <div className="w-full">
      <div className="overflow-hidden max-w-[350px] md:max-w-[760px] lg:max-w-[1200px] w-full" ref={emblaRef}>
        {slides &&<div className="flex lg:mx-12 items-center gap-x-3 h-[200px]  md:h-[400px] ">
           {slides.map((image: {imageUrl?:string, type?:string}, index: number)  => (
            <div className={`flex relative flex-shrink-0 bg-gray-50 h-[100%] w-[350px] md:w-[700px] rounded-md`} key={index}>
              <div className='flex absolute text-white bg-[#5f0c0c] px-2  rounded-sm'>{index+1} of {slides.length}</div>
                 {image.type==='image'?
                  <img src={image.imageUrl} alt={image.imageUrl} style={{objectFit: 'contain'}} className='h-full w-full'/>
                  :<video src={image.imageUrl} controls className="w-full h-full object-contain"/>
                 }            
            </div> 
          ))}
        </div>}
      </div>

      <div className="flex mt-2 lg:mt-3 lg:flex-row gap-3 flex-col-reverse justify-between w-full max-w-[350px] md:max-w-[760px] lg:max-w-[1200px]"> 
        <div className="embla__buttons w-fit justify-start">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
<div className='embla__dots pb-4 lg:pb-[2px] scroll-smooth overflow-x-scroll lg:overflow-x-clip justif-end'>
       {slides && <div className=" w-fit flex items-center gap-1">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={
                index === selectedIndex ? ' embla__dot--selected' : 'embla__dot'
              }
              imageUrl = {slides[index].imageUrl}
              mediaType= {slides[index].type}
            />
          ))}
        </div>}
      </div></div>
    </div>
  )
}

export default EmblaCarousel