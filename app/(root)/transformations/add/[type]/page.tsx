import Header from '@/components/shared/Header';
import TransformationForm from '@/components/shared/TransformationForm';
import { transformationTypes } from '@/constants';
import { getUserById } from '@/lib/actions/user.actions';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

const AddTransformationTypePage = async ({ params}: SearchParamProps) => {
  const { type } = params;
  // Wait for user authentication
  const { userId } = await auth();

  // Redirect to sign-in if user is not authenticated
  if (!userId) {
    redirect('/sign-in');
  }

  // Get transformation type
  const transformation = transformationTypes[type];

  // Fetch user details
  const user = await getUserById(userId);

  // Render page content
  return (
    <>
      <Header 
        title={transformation.title}
        subtitle={transformation.subTitle}
      />
    
      <section className="mt-10">
        <TransformationForm 
          action="Add"
          userId={user._id}
          type={transformation.type as TransformationTypeKey}
          creditBalance={user.creditBalance}
        />
      </section>
    </>
  );
};

export default AddTransformationTypePage;
