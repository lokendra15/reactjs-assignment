import Header from '../../components/Header';

const PublicLayout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default PublicLayout;
