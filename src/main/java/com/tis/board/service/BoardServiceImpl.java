package com.tis.board.service;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.tis.board.mapper.BoardMapper;
import com.tis.board.model.BoardVO;
import com.tis.board.model.PagingVO;
import com.tis.board.model.ReplyVO;

@Service
public class BoardServiceImpl implements BoardService {

   @Inject
   private BoardMapper boardMapper;

   @Override
   public int insertBoard(BoardVO board) {

      return this.boardMapper.insertBoard(board);
   }

   @Override
   public int getTotalCount() {
      return boardMapper.getTotalCount();
   }

   @Override
   public List<BoardVO> getAllBoardList(int start, int end) {
      return boardMapper.getAllBoardList(start, end);
   }

   @Override
   public List<BoardVO> getAllBoardList(PagingVO paging) {
      return boardMapper.getAllBoardListPaging(paging);
   }

   @Override
   public BoardVO findBoardByIdx(String idx) {
      // TODO Auto-generated method stub
      return null;
   }

   @Override
   public BoardVO findBoardByUserid(int board_user_no) {
      return this.boardMapper.findBoardByUserid(board_user_no);
   }

   @Override
   public BoardVO selectBoardView(int bidx) {
      return boardMapper.selectBoardView(bidx);
   }

   @Override
   public int editBoard(BoardVO boardVo) {
      return boardMapper.editBoard(boardVo);
   }

   @Override
   public int deleteBoard(int board_idx) {
      return boardMapper.deleteBoard(board_idx);
   }

   @Override
   public int getTotalCount(PagingVO paging) {
      // TODO Auto-generated method stub
      return 0;
   }

   @Override
   public List<BoardVO> getSearchList(PagingVO paging) {

      return boardMapper.searchBoard(paging);
   }

   @Override
   public int updateReadnum(int board_idx) {
      return boardMapper.updateReadnum(board_idx);
   }

   @Override
   public List<BoardVO> getTop5BoardList(PagingVO paging) {
      return boardMapper.getTop5BoardList(paging);
   }
   @Override
   public int insertReply(ReplyVO reply) {
      
      return boardMapper.insertReply(reply); 
   }

   @Override
   public List<ReplyVO> getReplyList(int board_idx) {
      return boardMapper.getReplyList(board_idx);
   }

   @Override
   public int countReply(int board_idx) {
      return boardMapper.countReply(board_idx);
   }

   @Override
   public int delReply(int board_idx,int reply_idx) {
      ReplyVO replyVo=new ReplyVO();
      replyVo.setBoard_idx_fk(board_idx);
      replyVo.setReply_idx(reply_idx);
      return boardMapper.delReply(replyVo);
}

	@Override
	public ReplyVO selectReply(int reply_idx) {
		return boardMapper.selectReply(reply_idx);
}

}