import React from 'react';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Paginate = ({ pages, page, isAdmin = false, scope }) => {
  return (
    pages > 1 && (
      <Pagination className='my-3'>
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={
              isAdmin
                ? scope === 'tests'
                  ? `/admin/teste/pagina/${x + 1}`
                  : `/admin/utilizatori/pagina/${x + 1}`
                : scope === 'patients' && `/pacienti/pagina/${x + 1}`
            }
          >
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
};

export default Paginate;
