import styles from "./spinner.module.css"

const Spinner = ({ size = 10 }: { size?: number }) => {
  return (
    <div
      style={{
        border: `${size / 4}px solid var(--secondary-color)`,
        borderLeft: `${size / 4 - 1}px solid var(--accent-color)`,
        borderRadius: "50%",
        width: size,
        height: size,
      }}
      className={styles.spinner}
    />
  )
}

export default Spinner
