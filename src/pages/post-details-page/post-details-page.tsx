import { useNavigate, useParams } from "react-router-dom"
import { useGetPostByIdQuery } from "../../features/posts/postsApiSlice"
import styles from "./post-details-page.module.css"
import Loader from "../../components/loader/loader"

const PostDetailsPage = () => {
  const { id } = useParams()
  const { data: post, isLoading, isError } = useGetPostByIdQuery(id || "")
  const navigate = useNavigate()

  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    throw new Error("Пост не найден")
  }

  return (
    <div className={styles.postDetailsPage}>
      <button
        className={styles.backButton}
        onClick={() => {
          navigate("/")
        }}
      >
        Вернуться к списку карточек
      </button>
      <h1>{post?.name}</h1>
      <p>{post?.description}</p>
      <img className={styles.image} src={post?.avatar} alt={post?.name} />
    </div>
  )
}

export default PostDetailsPage
