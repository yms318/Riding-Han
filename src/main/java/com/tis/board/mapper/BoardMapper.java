package com.tis.board.mapper;

import java.util.List;

import com.tis.board.model.BoardVO;
import com.tis.board.model.PagingVO;
import com.tis.board.model.ReplyVO;

public interface BoardMapper {

   int insertBoard(BoardVO board);

   int getTotalCount();

   List<BoardVO> getAllBoardList(int start, int end);

   List<BoardVO> getAllBoardListPaging(PagingVO paging);

   BoardVO findBoardByIdx(String idx);

   BoardVO findBoardByUserid(int board_user_no);

   BoardVO selectBoardView(int bidx);

   int editBoard(BoardVO boardVo);

   int deleteBoard(int board_idx);

   List<BoardVO> searchBoard(PagingVO paging);

   int updateReadnum(int board_idx);

   List<BoardVO> getTop5BoardList(PagingVO paging);

   
   //답변형 답변달기

   int insertReply(ReplyVO reply);

   List<ReplyVO> getReplyList(int board_idx);

   int countReply(int board_idx);

   int delReply(ReplyVO replyVo);

   ReplyVO selectReply(int reply_idx);
   
}