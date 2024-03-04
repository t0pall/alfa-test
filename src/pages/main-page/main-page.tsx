import { useEffect, useState } from "react"
import styles from "./main-page.module.css"
import { useGetAllPostsQuery } from "../../features/posts/postsApiSlice"
import { getVisitorId } from "../../utils/getVisitorId"
import Post from "../../components/post/post"
import Loader from "../../components/loader/loader"

export const MainPage = () => {
  const [userId, setUserId] = useState<string>("")
  const [isFilter, setIsFilter] = useState<boolean>(false)

  const { data: allPosts, isLoading } = useGetAllPostsQuery()

  useEffect(() => {
    const fetchId = async () => {
      const result = await getVisitorId()
      setUserId(result.visitorId)
    }
    fetchId()
  }, [])

  const filteredPosts = isFilter
    ? allPosts?.filter(post => post.reactions.length > 0)
    : allPosts

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className={styles.mainPage}>
      <button
        className={styles.filterButton}
        onClick={() => setIsFilter(!isFilter)}
      >
        {isFilter ? "Сбросить фильтр" : "Фильтр"}
      </button>
      <div className={styles.container}>
        {filteredPosts?.map(post => <Post post={post} userId={userId} />)}
      </div>
    </div>
  )
}
