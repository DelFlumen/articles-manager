import { useEffect, useState } from 'react';
import {
  IconButton,
  Stack,
  FormControl,
  FormLabel,
  Select,
  // useToast,
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { useQuery } from 'react-query';
import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import Article from './Article';

type ArticleType = {
  id: number;
  title: string;
  content: string;
  author: Record<string, number | string | unknown[]>;
  createdAt: string;
};

const fetchArticles = async (
  page: number,
  sortBy: string,
  sortOrder: string,
) => {
  const response = await fetch(
    `/api/articles?page=${page}&sort=${sortBy}&type=${sortOrder}`,
  );
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const Gallery = () => {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const { page, sort, type } = queryString.parse(location.search);
    setPage(page ? parseInt(page as string, 10) : 1);
    setSortBy(sort ? (sort as string) : 'createdAt');
    setSortOrder(type ? (type as string) : 'desc');
  }, [location.search]);

  const { data, isLoading, isError } = useQuery(
    ['articles', page, sortBy, sortOrder],
    () => fetchArticles(page, sortBy, sortOrder),
  );

  useEffect(() => {
    const queryParams = queryString.stringify({
      page,
      sort: sortBy,
      type: sortOrder,
    });
    navigate({ search: queryParams });
  }, [navigate, page, sortBy, sortOrder]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
    scrollToTop();
  };

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
    scrollToTop();
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sortValues = event.target.value.split(',');
    setSortBy(sortValues[0]);
    setSortOrder(sortValues[1]);
    setPage(1);
  };

  return (
    <>
      <Stack direction="column" align="center" spacing={6}>
        <FormControl maxWidth="30%" mb="1rem">
          <FormLabel>Sort</FormLabel>
          <Select value={`${sortBy},${sortOrder}`} onChange={handleSortChange}>
            <option value="title,asc">Title (A-Z)</option>
            <option value="title,desc">Title (Z-A)</option>
            <option value="createdAt,asc">Oldest to Newest</option>
            <option value="createdAt,desc">Newest to Oldest</option>
          </Select>
        </FormControl>
        {isError && <span>Error fetching data</span>}
        {isLoading ? (
          <span>Loading...</span>
        ) : (
          data?.map(
            ({ id, title, content, createdAt, author }: ArticleType) => (
              <Article
                key={id}
                articleInfo={{
                  id,
                  title,
                  content,
                  createdAt,
                  authorName:
                    typeof author.name === 'string' ? author.name : 'unknown',
                }}
              />
            ),
          ) || null
        )}
        {data?.length && (
          <Stack direction="row" spacing={4} mt={4}>
            <IconButton
              onClick={handlePrevPage}
              disabled={page === 1}
              aria-label="Previous page"
              icon={<ChevronLeftIcon />}
            />
            <IconButton
              onClick={handleNextPage}
              disabled={!data || data.length === 0}
              aria-label="Next page"
              icon={<ChevronRightIcon />}
            />
          </Stack>
        )}
      </Stack>
    </>
  );
};

export default Gallery;
