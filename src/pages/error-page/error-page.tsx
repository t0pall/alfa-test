import { Link, useRouteError } from "react-router-dom"
import styles from "./error-page.module.css"

const ErrorPage = () => {
  const error = useRouteError()

  const typedError = error as { message: string }
  return (
    <div className={styles.errorPage}>
      <div>{typedError.message}</div>
      <Link className={styles.link} to="/">
        На главную
      </Link>
    </div>
  )
}

export default ErrorPage
