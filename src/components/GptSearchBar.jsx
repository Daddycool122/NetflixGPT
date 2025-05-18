import React from 'react'
import { BG_IMG } from '../utils/constants';
import lang from '../utils/languageConstants';
import { useSelector } from 'react-redux';

const GptSearchBar = () => {
  const langKey = useSelector(store => store.config.lang)
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[60vh] py-10 sm:py-20">
      <div className="absolute inset-0 -z-10">
        <img
          src={BG_IMG}
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>
      <form className="w-11/12 sm:w-4/5 md:w-2/3 lg:w-1/2 bg-transparent grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-0 rounded-xl z-10">
        <input
          type="text"
          className="px-4 py-3 m-2 sm:m-4 col-span-1 sm:col-span-9 rounded-xl"
          placeholder={lang[langKey].gptSearchPlaceHolder}
        />
        <button className="bg-red-500 text-white rounded-xl px-4 py-3 m-2 sm:m-4 col-span-1 sm:col-span-3 w-full">
          {lang[langKey].search}
        </button>
      </form>
    </div>
  )
}

export default GptSearchBar