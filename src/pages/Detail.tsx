import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import {
  ApiResponseDetail,
  INutriments,
  INutriscoreData,
} from '@/interfaces/globalInterfaces';
import { getDetailFoodFacts } from '@/services/foodFactsServices';
import { Button, Modal, List } from 'flowbite-react';
import { useState, useEffect } from 'react';
import { formatKey } from '@/utils/globalUtils';
import CardDetail from '@/components/cardDetail';
import SidebarLayout from '@/layout/sidebarLayout';
import CardDynamic from '@/components/cardDynamic';

const Detail = () => {
  const { id_product } = useParams<{ id_product: string }>();
  const [openModalNutiments, setOpenModalNutriments] = useState(false);
  const [openModalNutriscore, setOpenModalNutriscore] = useState(false);

  const { data, isLoading, isError, error, refetch } = useQuery<
    ApiResponseDetail,
    Error
  >({
    queryKey: ['getDetailFoodFacts', Number(id_product)],
    queryFn: () => getDetailFoodFacts(Number(id_product)),
  } as UseQueryOptions<ApiResponseDetail, Error>);

  useEffect(() => {
    document.title = `${data?.product?.product_name || 'Detail page'} - My Food Facts`;
  }, []);

  if (isError) {
    <CardDynamic
      title="Error page"
      body={error.message}
      buttonText="Retry"
      onClick={refetch}
    />;
  }

  return (
    <SidebarLayout>
      <CardDetail
        dataProduct={data as ApiResponseDetail}
        setOpenModalNutriments={setOpenModalNutriments}
        setOpenModalNutriscore={setOpenModalNutriscore}
        isLoadingCardDetail={isLoading}
      />

      {/* Modal for Nutriments */}
      <Modal
        dismissible
        show={openModalNutiments}
        onClose={() => setOpenModalNutriments(!openModalNutiments)}
      >
        <Modal.Header>Nutriments</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <List>
              {Object.entries(
                (data?.product.nutriments as INutriments) || {}
              ).map(([key, value], index) => (
                <List.Item className="capitalize" key={index}>
                  <span className="font-medium"> {formatKey(key)}</span> :{' '}
                  {value}
                </List.Item>
              ))}
            </List>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setOpenModalNutriments(!openModalNutiments)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for Nutriscore */}
      <Modal
        dismissible
        show={openModalNutriscore}
        onClose={() => setOpenModalNutriscore(!openModalNutriscore)}
      >
        <Modal.Header>Nutricscore Data</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <List>
              {Object.entries(
                (data?.product.nutriscore_data as INutriscoreData) || {}
              ).map(([key, value], index) => (
                <List.Item className="capitalize" key={index}>
                  <span className="font-medium"> {formatKey(key)}</span> :{' '}
                  {value}
                </List.Item>
              ))}
            </List>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setOpenModalNutriscore(!openModalNutriscore)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </SidebarLayout>
  );
};

export default Detail;
