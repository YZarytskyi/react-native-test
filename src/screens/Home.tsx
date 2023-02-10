import { View, StyleSheet, FlatList } from "react-native";
import { useEffect, useState } from "react";
import PhotoCard from "../components/PhotoCard";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchPhotos } from "../store/photos/photosThunks";
import { removePhotos } from "../store/photos/photosSlice";

const Home = () => {
  const photos = useAppSelector((state) => state.photos.photos);
  const dispatch = useAppDispatch();

  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    dispatch(fetchPhotos(page));

    return () => {
      dispatch(removePhotos())
    }
  }, [page]);

  const fetchMorePhotos = () => {
    setPage((prev) => prev + 1)
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={photos}
        renderItem={({ item }) => <PhotoCard photo={item} />}
        onEndReached={fetchMorePhotos}
      ></FlatList>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
});
