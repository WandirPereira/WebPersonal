import React, { useState, useEffect } from 'react';
import { Loader, Pagination } from "semantic-ui-react";
import { size, map } from "lodash";
import { Newsletter } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { NewsletterItem } from "../NewsletterItem";
import "./ListNewsletters.scss";

const newsletterController = new Newsletter();

export  function ListNewsletters(props) {

  const { reload, onReload } = props;
  const [newsletters, setNewsletters] = useState(null);
  const { accessToken } = useAuth();
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState();


  useEffect(() => {
    (async () => {
      try {
        const response = await newsletterController.getNewsletters(accessToken, {page});

        // console.log(response.emailsStored.docs);
        // console.log(response.emailsStored.limit);
        // console.log(response.emailsStored.page);
        // console.log(page);

        setNewsletters(response.emailsStored.docs);
        setPagination({
            limit: response.emailsStored.limit,
            page: response.emailsStored.page,
            pages: response.emailsStored.pages,
            total: response.emailsStored.total,
        });
      } catch (error) {
        console.error(error);
      }
    })()
  }, [page, reload]);


  const changePage = (_, data) => {
    setPage(data.activePage);
  };

  if(!newsletters) return <Loader active inline="centered"/>
  if(size(newsletters) === 0) return "Não existem nenhum e-maill cadastrado!";

  return (
    <div className="list-emails">
      {map(newsletters, (newsletter) => (
         <NewsletterItem key={newsletter._id} newsletter={newsletter} onReload={onReload} />
      ))}

      <div className="list-emails__pagination">
        <Pagination
          totalPages={pagination.pages}
          defaultActivePage={pagination.page}
          ellipsisItem={null}
          firstItem={null}
          lastItem={null}
          onPageChange={changePage}
        />
      </div>
    </div>
  );
}


