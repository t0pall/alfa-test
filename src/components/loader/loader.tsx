import Spinner from "./spinner/spinner"
import styles from "./loader.module.css"

const Loader = () => {
  return (
    <div className={styles.layout}>
      <Spinner size={50} />
    </div>
  )
}

export default Loader
