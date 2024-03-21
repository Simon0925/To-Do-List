import style from './Button.module.scss'

interface ButtonProps  {
    text:string;
    click?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}


export default function Button ({text,click}:ButtonProps){

    return(
        <>
            <button className={style['button']}  onClick={click}>{text}</button>
        </>
    )
}