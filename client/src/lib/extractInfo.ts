export function extractApplicantData(userInfo: any) {
  const { avatar_url, bio, email, html_url, node_id, name } = userInfo;
  return {
    picture: avatar_url,
    about: bio,
    email,
    socialMedia: [html_url],
    idAuth: node_id,
    name,
  };
}

export function extractRecruiterData(userInfo: any) {
  const { avatar_url, bio, email, node_id, name } = userInfo;
  if (userInfo.name) {
    return {
      picture: avatar_url,
      about: bio || "",
      email,
      idAuth: node_id,
      recruiterName: name,
      name: "",
      logo: "",
      founded: "",
      externalLinks: [],
      headOffice: "",
    };
  } else {
    return {
      picture: avatar_url,
      about: bio || "",
      email,
      idAuth: node_id,
      recruiterName: "",
      name: "",
      logo: "",
      founded: "",
      externalLinks: [],
      headOffice: "",
    };
  }
}
