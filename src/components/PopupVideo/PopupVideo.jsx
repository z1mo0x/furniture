import styles from './PopupVideo.module.css'

export default function PopupVideo({ videoPopup, openVideo, isVideoOpen }) {
    return (



        <>
            <div onClick={openVideo} className={`${styles.overlay} ${isVideoOpen ? styles.active : ''}`}>
                <div className={styles.popup}>
                    <div className={styles.popup__wrapper}>
                        <video controls className={styles.popup__video}
                            onClick={(e) => {
                                e.stopPropagation()
                            }}>
                            <source src={videoPopup} />
                        </video>
                    </div>
                </div>
            </div >
        </>
    )
}
