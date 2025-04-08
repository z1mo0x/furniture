import videoIcon from '../../../img/video-button.png'
import styles from './ButtonVideo.module.css'

export default function ButtonVideo({ openVideo }) {
    return (
        <>
            <button onClick={openVideo} className={styles.button}>
                <div>
                    <img src={videoIcon} alt="" />
                </div>
                Watch video
            </button>
        </>
    )
}
