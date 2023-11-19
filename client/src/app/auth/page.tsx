import Card from '../shared/components/UIElements/Card';
import AuthForm from './components/AuthForm';

const AuthPage = () => {
  return (
    <>
      <div className="flex justify-center items-center h-screen mt-10">
        <div className="w-80 sm:w-96">
          <Card className="bg-gray-300 p-4">
            <AuthForm />
          </Card>
        </div>
      </div>
    </>
  );
};

export default AuthPage;