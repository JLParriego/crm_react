//Hook de react-router-dom que lee parámetros
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';

const VerCliente = () => {
  //useState para almacenar el cliente que traigo con obtenerClienteAPI
  const [cliente, setCliente] = useState({});

  //Controlar que el componente carge y todavía no tengamos datos de la API
  const [cargando, setCargando] = useState(true);

  //Deestructuring de params para sacar solo su id (const params = useParams())
  const { id } = useParams();

  //Cuando esté listo componente VerCliente, hacemos llamada a db.json
  useEffect(() => {
    const obtenerClienteAPI = async () => {
      try {
        const url = `http://localhost:4000/clientes/${id}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        setCliente(resultado);
      } catch (error) {
        console.log(error);
      }
      //Ponemos retardo para simular carga y así ver el spinner
      setTimeout(() => {
        setCargando(!cargando);
      }, 1000);
    };
    obtenerClienteAPI();
  }, []);

  return (
    //En caso de que el cliente no exista
    cargando ? (
      <Spinner />
    ) : Object.keys(cliente).length === 0 ? (
      <p>No hay resultados</p>
    ) : (
      <div>
        <>
          <h1 className="font-black text-4xl text-blue-900">
            Ver Cliente: {cliente.nombre}{' '}
          </h1>
          <p className="mt-3">Información del cliente</p>

          {cliente.nombre && (
            <p className="text-2xl text-gray-600 mt-10">
              <span className=" text-gray-800 uppercase font-bold">
                Cliente:{' '}
              </span>
              {cliente.nombre}
            </p>
          )}
          {cliente.mail && (
            <p className="text-2xl text-gray-600 mt-4">
              <span className=" text-gray-800 uppercase font-bold">
                email:{' '}
              </span>
              {cliente.email}
            </p>
          )}
          {cliente.telefono && (
            <p className="text-2xl text-gray-600 mt-4">
              <span className=" text-gray-800 uppercase font-bold">
                Teléfono:{' '}
              </span>
              {cliente.telefono}
            </p>
          )}
          {cliente.empresa && (
            <p className="text-2xl text-gray-600 mt-4">
              <span className=" text-gray-800 uppercase font-bold">
                Empresa:{' '}
              </span>
              {cliente.empresa}
            </p>
          )}
          {cliente.notas && (
            <p className="text-2xl text-gray-600 mt-4">
              <span className=" text-gray-800 uppercase font-bold">
                Notas:{' '}
              </span>
              {cliente.notas}
            </p>
          )}
        </>
      </div>
    )
  );
};

export default VerCliente;
