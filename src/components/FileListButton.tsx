import * as Icons from "@svg/Icons";
import { dialog } from '@tauri-apps/api';
import { homeDir } from '@tauri-apps/api/path';
import { convertFileSrc } from '@tauri-apps/api/tauri';
import { useState } from 'react';
import Button from './Button';
import Image from './Image';

export default function FileListButton() {
  const [Images, setImages] = useState<string[]>([]);

  const chooseFiles = async () => {
    const home = await homeDir()
    const selected = await dialog.open({
      multiple: true,
      filters: [{
        name: 'Image',
        extensions: ['png', 'jpg', 'jpeg']
      }]
    });
    if (Array.isArray(selected)) {
      // user selected multiple files
      setImages([...selected].map((path) => convertFileSrc(path)))
    } else if (selected === null) {
      // user cancelled the selection
    setImages([])
    } else {
      // user selected a single directory
      setImages([...selected].map((path) => convertFileSrc(path)))
    }
  };

  //  useEffect(() => {
  //    console.log(Images);
  //  }, [Images])

  //   async function greet() {
  //   // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
  //   setGreetMsg(await invoke("greet", { name }));
  // }


  return (
    <section className='container mx-auto p-5 w-50 h-50'>
      <Button className='border border-neutral-800 dark:border-white text-lg dark:text-white p-4' onClick={chooseFiles}>Choose images</Button>
      <ul className="grid lg:grid-cols-3 sm:grid-cols-1 gap-4 mt-5">
        {Images.length > 0 ? Images.map((image, index) => (
          <li className='min-w-[300px] backdrop-blur-md bg-white/10 dark:bg-black/30 shadow-3xl dark:shadow-none overflow-hidden rounded-lg' key={index}>
            <Image className='w-full h-60 object-cover' src={image} alt="" />
            <div className='flex gap-5 justify-between p-3'>
              <p className='text-sm text-neutral-900 dark:text-white'>{image.substring(image.lastIndexOf(`%2`) + 2)}</p>
              <Icons.Dots className='h-6 w-6 text-neutral-800 dark:text-white' />
            </div>
          </li>
        )) :
          <li>
            <div
              id="drop-zone"
              className="flex justify-center items-center min-h-[300px] border-2 border-neutral-800 dark:border-white"
            >
              <p className="font-bold text-neutral-800 dark:text-white">Drop files here</p>
            </div>
          </li>
        }
      </ul>
    </section>
  );
}
