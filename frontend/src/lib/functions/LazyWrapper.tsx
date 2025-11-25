import { Suspense, ComponentType, LazyExoticComponent } from "react";
import Loader from "../../components/loader/loader";

const LazyWrapper = (Component: LazyExoticComponent<ComponentType<any>>) => {
  return (
    <Suspense fallback={<Loader />}>
      <Component />
    </Suspense>
  );
};

export default LazyWrapper;
