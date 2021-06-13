import { useHistory } from "react-router-dom";
import server from "../api/server";
import pdfIcon from "../assets/pdf-icon.png";
import { AuthContext } from "../contexts/Auth.context";
import { useContext, useState } from "react";
import { useEffect } from "react";

const { Button, Container, Row, Card } = require("react-bootstrap");

function LandingPage() {
  const history = useHistory();
  const {
    user,
    signInContext,
    signOutContext,
    isSignedIn,
    getCurrentUserIdToken,
  } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);

  const createNewProject = async () => {
    const token = await getCurrentUserIdToken();

    const res = await server.get("/new", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const { projectId } = res.data;
    history.push(`/p/${projectId}`);
  };

  useEffect(() => {
    (async () => {
      const token = await getCurrentUserIdToken();

      const res = await server.get("/projects", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProjects(res.data);
    })();
  });

  const renderProjects = () => {
    return projects.map((project, idx) => {
      return (
        <Card key={project._id} style={{ width: "18rem", marginTop: "2rem" }}>
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {project._id}
            </Card.Subtitle>

            <Card.Link href={`/p/${project._id}`}>Open project</Card.Link>
          </Card.Body>
        </Card>
      );
    });
  };

  return (
    <div>
      <Container
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          height: "70vh",
          flexDirection: "column",
        }}
      >
        <Row>
          <h1>
            Live <i>{"<html>"}</i> to{" "}
            <img height="80px" src={pdfIcon} alt="Logo" />
          </h1>
        </Row>
        <Row>
          <Button variant="primary" onClick={createNewProject}>
            Create New Project
          </Button>
        </Row>
      </Container>
      <h1 style={{ textAlign: "center" }}>Your Projects</h1>
      <Container
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "stretch",
          flexWrap: "wrap",
        }}
      >
        {renderProjects()}
      </Container>
    </div>
  );
}

export default LandingPage;
