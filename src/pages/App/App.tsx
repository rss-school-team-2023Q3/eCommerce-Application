import { useEffect, useState } from 'react';
import './App.css';
import { getApiRoot, projectKey } from 'shared/libs';

function App() {
  const [projectDetails, setProjectDetails] = useState({});

  const getProject = async () => {
    try {
      const project = await getApiRoot()
        .withProjectKey({ projectKey }).get().execute();
        // .products()
        // .get()
        // .execute();

      // .customers()
      // .get()
      // .execute();

      setProjectDetails(project.body);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getProject();
  }, []);

  return (
    <>
      <div>Project Details</div>
      {JSON.stringify(projectDetails, undefined, 2)}
    </>
  );
}

export default App;
