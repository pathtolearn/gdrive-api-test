import React from "react";
import Header from "../shared/components/Header";
import { Switch, Route } from "react-router";
import FilesAndFoldersView from "./FilesAndFoldersView";
import UploadFilesToAFolder from "./uploadfiles";

interface Props {}

const Home = (props: Props) => {
  return (
    <div>
      <Header />
      <Switch>
        <Route path="/" component={UploadFilesToAFolder} exact />
        <Route path="/filesAndFolders" exact component={FilesAndFoldersView} />
      </Switch>
      {/* <Footer /> */}
    </div>
  );
};

export default Home;
