import { useState, useEffect, useRef } from 'react';
import { fetchCats } from '../../shared/api/cats';
import { CatCard } from '../../shared/ui/CatCard';
import { useCatsStore } from '../../shared/store/cats';
import './cats-list.css';

export const CatsListAll = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerTarget = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(false);
  const {
    allCats,
    addCats,
    currentPage,
    setCurrentPage,
    isAllCatsInitialized,
    setAllCatsInitialized,
  } = useCatsStore();

  const loadMoreCats = async (pageNum: number) => {
    if (loadingRef.current || !hasMore) return;

    loadingRef.current = true;
    setIsLoading(true);
    try {
      const newCats = await fetchCats(pageNum);
      if (newCats.length === 0) {
        setHasMore(false);
      } else {
        addCats(newCats);
        setCurrentPage(pageNum + 1);
      }
    } catch (error) {
      console.error('Failed to load cats:', error);
    } finally {
      loadingRef.current = false;
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loadingRef.current && hasMore) {
          loadMoreCats(currentPage);
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [currentPage, hasMore]);

  useEffect(() => {
    if (!isAllCatsInitialized && !loadingRef.current && allCats.length === 0) {
      loadMoreCats(0);
      setAllCatsInitialized(true);
    }
  }, []);

  return (
    <div className="cats-list-container">
      <div className="cats-list">
        {allCats.map((cat, index) => (
          <CatCard key={`${cat.id}-${index}`} cat={cat} />
        ))}
      </div>

      <div ref={observerTarget} className="cats-list__loader">
        {isLoading && <p>... загружаем еще котиков ...</p>}
      </div>
    </div>
  );
};
