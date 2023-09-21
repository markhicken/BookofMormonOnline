/** @format */

import { normalizeVal } from "./Cache"

const queries = {
  person: (ids) => {
    return {
      type: "person",
      key: "slug",
      val: ids,
      query:
        q("person", "slug", ids) +
        `{
                slug
                name
                title
                classification
                unit
                date
                description
                relations {
                    relation
                    person {
                        name
                        slug
                        title
                    }
                }
                index {
                    slug
                    ref
                    text
                }
            } `,
    }
  },
  personList: (ids) => {
    return {
      type: "personList",
      key: "slug",
      val: ids,
      query:
        q("personList: person", "slug", ids) +
        `{
                slug
                name
                title
                classification
                identification
                unit
                date 
            }`,
    }
  },
  places: (ids) => {
    return {
      type: "places",
      key: "slug",
      val: ids,
      query:
        q("place", "slug", ids) +
        `{
                slug
                name
                info
                occupants
                type
                location
                description
                maps{
                    slug
                    name
                }
                index {
                    slug
                    ref
                    text
                }
            }`,
    }
  },
  placeList: (ids) => {
    return {
      type: "placeList",
      key: "slug",
      val: ids,
      query:
        q("placeList: place", "slug", ids) +
        `{
                slug
                name
                info
                occupants
                type
                location 
            }`,
    }
  },
  page: (ids) => {
    return {
      type: "page",
      key: "slug",
      val: ids,
      query:
        q("page", "slug", ids) +
        `{
                title
                slug
                sections {
                  title
                  slug
                  rows {
                    weight
                    type
                    narration {
                      description
                      #timeline
                      text {
                        guid
                        slug
                        heading
                        content
                        chrono
                        duration
                        quotes {
                          parent
                          parentSlug
                          slug
                          heading
                          content
                          duration
                        }
                      }
                    }
                    connection {
                      isPage
                      type
                      text
                      slug
                    }
                    capsulation {
                      description
                      reference
                      slug
                    }
                  }
                }
              }`,
    }
  },
  commentary: (ids) => {
    return {
      type: "commentary",
      key: "id",
      val: ids,
      query:
        q("commentary", "id", ids) +
        `{
                id
                slug
                title
                reference
                publication {
                  source_title
                  source_rating
                  source_name
                  source_short
                  source_slug
                  source_id
                  source_url
                  source_year
                  source_publisher
                }
                location {
                  slug
                }
                text
              }`,
    }
  },
  image: (ids) => {
    return {
      type: "image",
      key: "id",
      val: ids,
      query:
        q("image", "id", ids) +
        `{
                id
                title
                artist
                link
                width 
                height 
                location {
                    slug
                }
            }`,
    }
  },
  lookup: (refs) => {
    return {
      type: "lookup",
      key: "ref",
      val: refs,
      query:
        q("lookup", "ref", refs) +
        `{
            slug
            heading
          }`,
    }
  },
  search: (query) => {
    return {
      type: "search",
      key: "query",
      val: query,
      query:
        q("search", "query", query) +
        `{
            reference
            text
            slug
            page
            section
            narration
          }`,
    }
  },
  contents: (ids) => {
    return {
      type: "contents",
      key: "slug",
      val: ids,
      query:
        q("division", "slug", ids) +
        `{
                title
                slug
                description
                pages {
                    title
                    slug
                    sections{
                        title
                        slug
                    }
                }
            }`,
    }
  },
  history: (slugs) => {
    return {
      type: "history",
      key: "slug",
      val: slugs,
      query:
        q("history", "slug", slugs) +
        `{
          seq
          id
          slug
          year
          date
          link
          type
          source
          author
          document
          citation
          teaser
          pages
          ${(slugs) ? "transcript" : ""}
         }`,
    }
  },
  divisionShell: (ids, token) => {
    return {
      type: "divisionShell",
      key: "slug",
      val: ids,
      query:
        q("division", "slug", ids) +
        `{
                title
                slug
                description
                pages {
                  slug
                  title
                  counts
                }
            }`,
    }
  },
  divisionProgress: (ids, token) => {
    return {
      type: "divisionProgress",
      key: "slug",
      val: ids,
      query:
        q("division", "slug", ids) +
        `{
            title
            slug
            description
            progress(token: "${token}")
            {
                completed
                started
            }
            }`,
    }
  },
  divisionProgressDetails: (ids, token) => {
    return {
      type: "divisionProgressDetails",
      key: "slug",
      val: ids,
      query:
        q("division", "slug", ids) +
        `{
          title
          slug
          description
          progress(token: "${token}") {
            completed
            started
          }
          pages {
            slug
            title
            sections {
              title
              sectionText {
                heading
                link
              }
            }
            progress(token: "${token}") {
              completed
              started
              completed_items
              started_items
              active_items
            }
          }
        }
        `,
    }
  },
  tokenSignIn: (token) => {
    return {
      type: "tokenSignIn",
      key: "token",
      val: token,
      query:
        q("tokensignin", "token", token) +
        `{
          isSuccess
          msg
          social {
            user_id
            nickname
            profile_url
            access_token
          }
          user {
            user
            email
            name
            bookmark
            zip
            finished
            complete
            started
            time
            #sessions #add to db
            progress {
              completed
              started
            }
            networks {
              network
              social_id
            }
            social {
              user_id
              nickname
              profile_url
              access_token
            }
          }
        }`,
    }
  },
  shortLink: (hash) => {
    return {
      type: "shortLink",
      key: "hash",
      val: hash,
      query:
        q("shortlink", "hash", hash) +
        `{
            shortLink
          }`,
    }
  },
  setShortLink: (string) => {
    return {
      type: "setShortLink",
      key: "string",
      val: string,
      query: `mutation shortlink{shortlink(string:"${string}"){hash}}`,
    }
  },
  imageInFeed: (ids) => {
    return {
      type: "imageInFeed",
      key: "id",
      val: ids,
      query:
        q("image", "id", ids) +
        `{
                id
                title
                artist
                link
                width 
                height 
                location{
                  heading
                  slug
                  imgIds
                  comIds
                  parent_page{
                    title
                  }
                  parent_section{
                    title
                  }
                  narration
                  {
                    description
                  }
                }
            }`,
    }
  },
  commentaryInFeed: (ids) => {
    return {
      type: "commentaryInFeed",
      key: "id",
      val: ids,
      query:
        q("commentary", "id", ids) +
        `{
        id
        title
        text
        publication {
          source_title
          source_name
          source_short
          source_id
        }
        location {
          heading
          slug
          imgIds
          comIds
          parent_page{
            title
          }
          parent_section{
            title
          }
          narration
          {
            description
          }
        }
      }`,
    }
  },
  imageLocations: (ids) => {
    return {
      type: "imageLocations",
      key: "id",
      val: ids,
      query:
        q("image", "id", ids) +
        `{
                location{
                  slug
                }
            }`,
    }
  },
  commentaryLocations: (ids) => {
    return {
      type: "commentaryLocations",
      key: "id",
      val: ids,
      query:
        q("commentary", "id", ids) +
        `{
        location {
          slug
      }
    }`,
    }
  },
  textInFeed: (slugs) => {
    return {
      type: "textInFeed",
      key: "slug",
      val: slugs,
      query:
        q("text", "slug", slugs) +
        `  {
        slug
        heading
        content
        imgIds
        comIds
        parent_page{
          title
        }
        parent_section{
          title
        }
        narration
        {
          description
        }
      }`,
    }
  },
  sectionInFeed: (slugs) => {
    return {
      type: "sectionInFeed",
      key: "slug",
      val: slugs,
      query:
        q("section", "slug", slugs) +
        `  {
        slug
        title
        page{
          title
        }
        rows{
          narration{
            description
          }
          capsulation
          {
            description
          }
        }
      }`,
    }
  },
  fax: (input) => {
    return {
      type: "fax",
      key: "slug",
      val: input,
      query:
        q("fax", "filter", input) +
        `  {   
        slug
        title
        info
        code
      }`,
    }
  },
  maplist: () => {
    return {
      type: "maplist",
      key: "slug",
      val: false,
      query:
        q("maps", "id", [null]) +
        `  {   
        slug
        name
        desc
        centerx
        centery
        minzoom
        maxzoom
        zoom
        tiles
      }`,
    }
  },
  map: (slugs) => {
    return {
      type: "map",
      key: "slug",
      val: slugs,
      query:
        q("maps", "slug", slugs) +
        `  {    
        slug
        name
        desc
        centerx
        centery
        minzoom
        maxzoom
        zoom
        tiles
        places {
          slug
          name
          info
          lng
          lat
          minZoom
          maxZoom
          h
          w
          ax
          ay
        }
      }`,
    }
  },
  timeline: () => {
    return {
      type: "timeline",
      key: "timeline",
      val: false,
      query:
        q("timeline", "id", [null]) +
        `  {    
        text
        {
          slug
        }
        slug
        file
        heading
        date
        html
        x
        y
        w
        h
        o
        z
        p
      }`,
    }
  },
  about: () => {
    return {
      type: "about",
      key: "about",
      val: false,
      query:
        q("about", "about", [null]) +
        `  {    
        title
        aboutsections {
          heading
          text
        }
      }`,
    }
  },
  labels: () => {
    return {
      type: "labels",
      key: "key",
      val: false,
      query:
        q("labels", "labels", [null]) +
        `  {   
          key
          val
      }`,
    }
  },
  studylog: (tokens) => {
    return {
      type: "studylog",
      key: "token",
      val: tokens,
      query:
        q("studylog", "token", tokens) +
        `  {   
          summary
          {
            first
            duration
            count
            finished
          }
          sessions
          {
              datetime
              timestamp
              duration
              description
              slug
          }
      }`,
    }
  },
  userdailyscores: (tokens) => {
    return {
      type: "userdailyscores",
      key: "token",
      val: tokens,
      query:
        q("userdailyscores", "token", tokens) +
        `  {   
          dates
          progress
      }`,
    }
  },
  userprogress: (token) => {
    return {
      type: "userprogress",
      key: "token",
      val: token,
      query:
        q("userprogress", "token", token) +
        `  {   
            completed
            started
            summary {
              first
              duration
              count
              finished
            }
      }`,
    }
  },
  signin: (input) => {
    input = input.shift();
    return {
      type: "signin",
      key: 0,
      val: input,
      query:
        ` signin(username:"${input.username}",password:"${input.password}",token: "${input.token}") {   
          isSuccess
          msg
          social {
            user_id
            nickname
            profile_url
            access_token
          }
          user {
            user
            progress {
              completed
              started
            }
            social {
              user_id
              nickname
              profile_url
              access_token
            }
          }
      }`,
    }
  },
  signout: (input) => {
    input = input.shift();
    return {
      type: "signout",
      key: 0,
      val: input,
      query: `mutation signout{ signout( token: "${input.token}" ) } `,
    }
  },
  signup: (input) => {
    input = input.shift();
    return {
      type: "signup",
      key: 0,
      val: input,
      query: `mutation {` +
      `        signup(` +
      `          token: "${input.token}"` +
      `          username: "${input.username}"` +
      `          password: "${input.password}"` +
      `          name: "${input.name}"` +
      `          email: "${input.email}"` +
      `          zip: "${input.zip}"` +
      `        ) {` +
      `          isSuccess` +
      `          msg` +
    `            social {` +
    `              user_id` +
    `              nickname` +
    `              profile_url` +
    `              access_token` +
    `            }` +
      `          user {` +
      `            user` +
      `            name` +
      `            email` +
      `            zip` +
      `            progress {` +
      `              completed` +
      `              started` +
      `            }` +
      `          }` +
      `        }` +
      `      }
      `,
    }
  },
  log: (input) => {
    input = input.shift();
    return {
      type: "log",
      key: 0,
      val: input,
      query: `mutation {` +
      `        log(` +
      `          token: "${input.token}"` +
      `          key: "${input.key}"` +
      `          val: "${input.val}"` +
      `        ) {` +
      `          logged` +
      `          progress {` +
      `              completed` +
      `              started` +
      `          }` +
      `        }` +
      `      }
      `,
    }
  },
  editProfile: (input) => {
    input = input.shift();
    return {
      type: "editProfile",
      key: 0,
      val: input,
      query: `mutation {` +
      `        editProfile(` +
      `          token: "${input.token}"` +
      `          name: "${input.name}"` +
      `          email: "${input.email}"` +
      `          zip: "${input.zip}"` +
      `        ) {` +
      `          user` +
      `          name` +
      `          email` +
      `          zip` +
      `        }` +
      `      }
      `,
    }
  },
  changePassword: (input) => {
    input = input.shift();
    return {
      type: "changePassword",
      key: 0,
      val: input,
      query: `mutation {` +
      `        changePassword(` +
      `          token: "${input.token}"` +
      `          password: "${input.password}"` +
      `        )  ` +
      `      }
      `,
    }
  },
  publications: () => {
    return {
      type: "publications",
      key: 0,
      val: false,
      query: `publications {
            source_id
            source_rating
            source_title
            source_name
            source_short
            source_slug
            source_url
            source_publisher
            source_description
            source_year
        } `,
    }
  },
  pageprogress: (input) => {
    input = input.shift();
    return {
      type: "pageprogress",
      key: 0,
      val: input,
      query:
        ` pageprogress(token:"${input.token}",slug: ${JSON.stringify(input.slug)}) {   
          count
          completed_items
          started_items
          active_items
          completed
          started
      }`,
    }
  },
  pageinfoprogress: (input) => {
    input = input.shift();
    return {
      type: "pageinfoprogress",
      key: 0,
      val: input,
      query:
        ` page(slug: ${JSON.stringify(input.slug)}) {
          title
          slug
          sections {
            title
            sectionText {
              heading
              link
            }
          }
          progress(token: "${input.token}") {
            count
            completed
            started
            completed_items
            started_items
          }
        }`,
    }
  },
  loadGroupsFromHash: (input) => {
    return {
      type: "loadGroupsFromHash",
      key: "hash",
      val: input,
      query:
         q("loadGroupsFromHash", "hash", input) +
        ` {
          channel_url
          name
          member_count
          cover_url
          custom_type
          data
          messages
          {
              message_id
              created_at
              custom_type
              message
              data
              user {
                user_id
                nickname
                profile_url
                metadata {
                  summary
                  bookmark
                }
              }
          }
          members
          {
              user_id
              is_active
              joined_ts
              state
              role
              is_online
              require_auth_for_profile_image
              last_seen_at
              nickname
              profile_url
              metadata {
                summary
                bookmark
              }
            }
      }`,
    }
  },
  joinGroup: (input) => {

    input = input.shift();
    return {
      type: "joinGroup",
      key: 0,
      val: input,
      query: `mutation {` +
      `        joinGroup(` +
      `          token: "${input.userToken}"` +
      `          hash:  "${input.hash}"` +
      `        ) {` +
      `          isSuccess` +
      `          msg` +
      `          channel` +
      `          user` +
      `        }` +
      `      }
      `,
    }
  },
  joinOpenGroup: (input) => {

    input = input.shift();
    return {
      type: "joinOpenGroup",
      key: 0,
      val: input,
      query: `mutation {` +
      `        joinOpenGroup(` +
      `          token: "${input.userToken}"` +
      `          url:  "${input.url}"` +
      `        ) {` +
      `          isSuccess` +
      `          msg` +
      `          channel` +
      `          user` +
      `        }` +
      `      }
      `,
    }
  },
  requestToJoinGroup: (input) => {

    input = input.shift();
    return {
      type: "requestToJoinGroup",
      key: 0,
      val: input,
      query: `mutation {` +
      `        requestToJoinGroup(` +
      `          token: "${input.userToken}"` +
      `          url:  "${input.url}"` +
      `        ) {` +
      `          isSuccess` +
      `          msg` +
      `          channel` +
      `          user` +
      `        }` +
      `      }
      `,
    }
  },
  withdrawRequest: (input) => {

    input = input.shift();
    return {
      type: "withdrawRequest",
      key: 0,
      val: input,
      query: `mutation {` +
      `        withdrawRequest(` +
      `          token: "${input.userToken}"` +
      `          url:  "${input.url}"` +
      `        ) {` +
      `          isSuccess` +
      `          msg` +
      `          channel` +
      `          user` +
      `        }` +
      `      }
      `,
    }
  },
  socialsignin: (input) => {
    input = input.shift();
    return {
      type: "socialsignin",
      key: 0,
      val: input,  
      query:
      ` socialsignin(network:"${input.network}", token:"${input.token}", social_token: "${input.social_token}") 
        {
          isSuccess
          msg
          profile_url
          social {
            user_id
            nickname
            profile_url
            access_token
          }
          user {
            user
            email
            name
            bookmark
            zip
            finished
            complete
            started
            time
            progress {
              completed
              started
            }
            networks {
              network
              social_id
            }
            social {
              user_id
              nickname
              profile_url
              access_token
            }
          }
        }`,
    }
  },
  markdown: (ids) => {
    return {
      type: "markdown",
      key: "slug",
      val: ids,
      query:
        q("markdown", "slug", ids) +
        `{
            slug
            markdown
         } `,
    }
  },

  leaderboard: (input) => {
    input = input.shift();
    return {
      type: "leaderboard",
      key: "token",
      val: false,
      query:  `leaderboard(token:"${input.token}")`  +
        `  {
            recentFinishers{
                nickname
                picture
                finished
                lastseen
                laststudied
                bookmark
            }
            currentProgress{
                nickname
                picture
                progress
                finished
                lastseen
                laststudied
                bookmark
            }
      }`,
    }
  },




  homegroups: (input) => {
    input = input.shift();
    return {
      type: "homegroups",
      key: "token",
      val: false,
      query:  `homegroups(token:"${input.token}" `+((input.grouping) ? `, grouping: "${input.grouping}" )` : ')')  +
        `  {
          url
          name
          description
          grouping
          privacy
          picture
          latest {
            timestamp
            msg
            user {
              user_id
              nickname
              picture
              progress
              finished
              lastseen
              laststudied
              bookmark
              public
            }
          }
          requests
          members {
            user_id
            nickname
            picture
            progress
            finished
            lastseen
            laststudied
            bookmark
            public
          }
        }`,
    }
  },  

  homefeed: (input) => {
    input = input.shift();
    return {
      type: "homefeed",
      key: "token",
      val: false,
      query:
      `homefeed(token:"${input.token}" `+((input.channel) ? `, channel: "${input.channel}"` : '')+((input.message) ? `, message: "${input.message}"` : '')+` ) `+
        `{    groups {
          url
          name
          privacy
          description
          grouping
          picture
          requests
          members{
              user_id
              nickname
              picture
              progress
              finished
              lastseen
              laststudied
              bookmark
              public
          }
        }
        feed {
          channel_url
          id
          timestamp
          msg
          user {
            user_id
            nickname
            picture
            progress
            finished
            lastseen
            laststudied
            bookmark
            public
          }
          mentioned_users {
            user_id
            nickname
            picture
            progress
            finished
            lastseen
            laststudied
            bookmark
            public
          }
          likes
          replycount
          repliers {
            user_id
            nickname
            picture
            progress
            finished
            lastseen
            laststudied
            bookmark
            public
          }
          link {
            key
            val
          }
          highlights
        }}`,
    }
  },  

  botlist: () => {
    return {
      type: "botlist",
      key: "botlist",
      val: false,
      query:
        ` botlist {
              name
              description
              picture
              id
              enabled
          }
        `,
    }
  },
  addBot: (input) => {
    input = input.shift();
    return {
      type: "addBot",
      key: "token",
      val: false,
      query: `mutation {addBot(token:"${input.token}" , channel: "${input.channel}", bot:"${input.bot}")}`,
    }
  },
  removeBot: (input) => {
    input = input.shift();
    return {
      type: "removeBot",
      key: "token",
      val: false,
      query: `mutation {removeBot(token:"${input.token}" , channel: "${input.channel}", bot:"${input.bot}")}`,
    }

  },

  homethread: (input) => {
    input = input.shift();
    return {
      type: "homethread",
      key: "token",
      val: false,
      query:
      `homethread(token:"${input.token}" , channel: "${input.channel}", message : "${input.message}" ) `+
        `{
          channel_url
          id
          timestamp
          msg
          user {
            user_id
            nickname
            picture
            progress
            finished
            lastseen
            laststudied
            bookmark
            public
          }
          mentioned_users {
            user_id
            nickname
            picture
            progress
            finished
            lastseen
            laststudied
            bookmark
            public
          }
          likes 
          highlights
        
      }`,
    }
  },
  requestedUsers: (input) => {
    input = input.shift();
    return {
      type: "requestedUsers",
      key: "token",
      val: false,
      query:
      `requestedUsers(token:"${input.token}" , channel: "${input.channel}" ) `+
        `{
          user_id
          nickname
          picture
          progress
          finished
          lastseen
          laststudied
          bookmark
          public
      }`,
    }
  },
  processRequest: (input) => {
    input = input.shift();
    return {
      type: "processRequest",
      key: "token",
      val: false,
      query:
      `mutation {processRequest(token:"${input.token}" , channel: "${input.channel}" ,user_id:"${input.user_id}" , grant: ${input.grant} ) }`,
    }
  },
  sourceUsage: (input) => {
    input = input.shift();
    return {
      type: "sourceUsage",
      key: "source",
      val: null,
      query:
      `sourceUsage(token:"${input.token}" , source: "${input.source}" ) `
      }
  }
}
/*
mutation{
  joinGroup(hash: "bbDoxLUga", token: "2abb97d6f314acaddca76804b3680602") {
    isSuccess
    msg
    group {
      name
    }
    user {
      nickname
    }
  }
}
*/


function q(type, key, vals) {
  if (vals.length === 1) vals = vals[0]
  return `${type} ` + (vals ? `(${key}: ` + JSON.stringify(vals) + ")" : "")
}

export function prepareQueries(input, token) {
  let queryStrings = []
  for (let key in input) {
    let val = normalizeVal(input[key])
    if (typeof queries[key] !== "function") continue
    if (queries[key].length === 0) queryStrings.push(queries[key]())
    if (queries[key].length === 1) queryStrings.push(queries[key](val))
    if (queries[key].length === 2) queryStrings.push(queries[key](val, token))
  }
  return queryStrings
}
